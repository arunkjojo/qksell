import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Info, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppSelector } from '@hooks/useAppSelector';
import Button from '@ui/Button';
import ErrorAlert from '@ui/ErrorAlert';
import { promotionPlans } from '@common/data/promotionPlans';
import { useLoading } from '@hooks/useLoading';
import { checkStatus, fetchDistrictById, phonePeNow, promotion } from '@api/index';
import { useAppDispatch } from '@common/hooks/useAppDispatch';
import { setDistrictList } from '@store/appSlice';
import { District, PhonePePayload, Product, PromotionOrderPayload } from '@common/types';
import { formatPrice } from '@utils/formatPrice';
import { phonePeTrIdByOrderId } from '@utils/phonePeTrIdByOrderId';
import { showAlert } from '@utils/showAlet';

declare global {
  interface Window {
    PhonePeCheckout: {
      transact: (options: { tokenUrl: string; callback: (response: string) => void; type: 'IFRAME' }) => void;
    };
  }
}

export const Cart: React.FC = () => {
  const { isLoading, setLoading } = useLoading();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { products, districts } = useAppSelector((state: { app: { products: Product[]; districts: District[] } }) => state.app);
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedDistricts, setSelectedDistricts] = useState<District[]>([]);

  const product = products?.find(p => id && parseInt(p?.id, 10) === parseInt(id, 10));
  const defaultDistrict = districts?.find(
    (district) => product?.location?.id === district?.id
  );
  useEffect(() => {
    const scriptId = 'phonepe-checkout-script';

    // Prevent injecting multiple times
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://mercury.phonepe.com/web/bundle/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        console.log('PhonePe checkout script loaded');
      };

      script.onerror = () => {
        console.error('Failed to load PhonePe script');
      };
    }

    // Optionally clean up on unmount
    return () => {
      const script = document.getElementById(scriptId);
      if (script) {
        script.remove();
      }
    };
  }, []);
  useEffect(() => {
    if (product?.location?.id) {
      const loadDistrics = async () => {
        setLoading(true);
        const category = await fetchDistrictById(product?.location?.id);
        dispatch(setDistrictList(category?.data));
        setLoading(false);
      };
      if (!districts || districts?.length === 0) {
        loadDistrics();
      }
    }
  }, [product, districts, dispatch, setLoading]);

  const handleDistrictChange = (district: District) => {
    setSelectedDistricts(prev => {
      if (prev.includes(district)) {
        return prev.filter(d => d !== district);
      }
      return [...prev, district];
    });
  };

  useEffect(() => {
    if (defaultDistrict && !showAdvanced) {
      setSelectedDistricts([defaultDistrict]);
    }
  }, [defaultDistrict, showAdvanced])

  if (!isLoading && (!product || !id)) {
    return (
      <ErrorAlert message="The post you're looking for doesn't exist or has been removed." />
    );
  }

  const getSelectedDistricts = (): string[] => {
    if (!showAdvanced) {
      return [defaultDistrict?.name].filter((name): name is string => typeof name === 'string');
    }

    return selectedDistricts.length > 0
      ? selectedDistricts.map(district => district?.name).filter(Boolean)
      : [defaultDistrict?.name].filter((name): name is string => typeof name === 'string');
  };

  const payNow = async (
    orderId: number | string,
    orderAmount: number,
    mobileNumber: string,
    userId: number | string
  ) => {
    if(!orderId || !orderAmount || !mobileNumber || !userId) return;

    const merchantTransactionId = phonePeTrIdByOrderId(orderId);
    const payload: PhonePePayload = {
      orderId,
      orderAmount,
      mobileNumber,
      userId,
      merchantTransactionId
    };
    const result = await phonePeNow(payload);

    if (result?.url) {
      window.PhonePeCheckout.transact({
        tokenUrl: result?.url,
        type: 'IFRAME',
        callback: (response: string) => handlePhonePeCallback(response, orderId, merchantTransactionId),
      });
    }
  }

  const handlePayment = async () => {
    // Implement PhonePe payment integration here
    const selectedPromotionPlan = promotionPlans.find(plan => plan?.id === selectedPlan);
    const promotionPayload: PromotionOrderPayload = {
      productReferenceId: `${id}`,
      amount: Number(selectedPromotionPlan?.price),
      districts: getSelectedDistricts(),
      productType: "Post",
      promoteType: "Whats-App Promote",
      referenceInfo: 'Promotion',
      productName: `Post promotion - # ${id}`,
      promoteTypeAction: `₹ ${selectedPromotionPlan?.price} for ${selectedPromotionPlan?.duration}, ${selectedPromotionPlan?.description}`
    }
    console.log('==========promotionPayload', promotionPayload);
    const result = await promotion(promotionPayload);
    if (result?.status) {
      await payNow(result.orderId, result.orderAmount, result.mobileNumber, result.userId);
    }
  };

  const handlePhonePeCallback = async (response: string, orderId: string | number, merchantTransactionId: string) => {
    switch (response) {
      case 'PAYMENT_INITIATED':
        break;

      case 'PAYMENT_ERROR':
        showAlert('PAYMENT ERROR', 'Payment initiation has failed');
        break;

      case 'INTERNAL_SERVER_ERROR':
        showAlert('INTERNAL SERVER ERROR', 'Something went wrong');
        break;

      case 'USER_CANCEL':
        showAlert('User Cancel', 'User cancelled the payment process');
        break;

      case 'CONCLUDED':
        await checkStatus(orderId, merchantTransactionId);
        break;
    }
  }

  const totalAmount:number = (promotionPlans.find(plan => plan.id === selectedPlan)?.price ?? 0) * selectedDistricts.length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link
            to={`/pm/${id}`}
            className="inline-flex items-center text-gray-600 hover:text-blue-600"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Post
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <Info size={20} className="text-yellow-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-800">Want Fast and Direct sales?</h3>
                <p className="text-yellow-700 mt-1">Even small promotion lead to fast sales.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Selected Product</h2>
              <div className="flex items-center gap-4">
                <img
                  src={product?.images[0]}
                  alt={product?.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{product?.title}</h3>
                  <p className="text-gray-600 mt-1">Price: {formatPrice(product?.price || 0)}</p>
                  <div className="flex justify-between flex-wrap">
                  <p className="text-gray-600 mt-1">Location: {product?.location?.name}</p>
                  <p className="text-gray-600 mt-1">Category: {product?.category}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Choose Promotion Plan</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {promotionPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`
                      relative border rounded-lg p-4 cursor-pointer
                      ${selectedPlan === plan.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                      ${plan.recommended ? 'ring-2 ring-blue-500' : ''}
                    `}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.recommended && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                          Recommended
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{formatPrice(plan?.price)}</h3>
                        <p className="text-sm text-gray-600">for {plan.duration}</p>
                      </div>
                      <div className={`
                        w-5 h-5 rounded-full border flex items-center justify-center
                        ${selectedPlan === plan.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}
                      `}>
                        {selectedPlan === plan.id && <Check size={12} className="text-white" />}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{plan.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Promotion Area</h2>
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  {showAdvanced ? (
                    <>Hide Advanced Options {<ChevronUp size={16} />}</>
                  ) : (
                    <>Show Advanced Options {<ChevronDown size={16} />}</>
                  )}
                </button>
              </div>

              {!showAdvanced ? (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">Your ad will be promoted in <span className="font-medium">{defaultDistrict?.name}</span></p>
                  <p className="text-sm text-gray-500 mt-1">This is based on your product location. Click "Show Advanced Options" to customize.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {districts.map((district) => (
                    <label
                      key={district?.id}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedDistricts?.includes(district)}
                        onChange={() => handleDistrictChange(district)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{district?.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handlePayment}
          >
            Pay Now - {formatPrice(totalAmount)}
          </Button>
        </div>
      </div>
    </div>
  );
};