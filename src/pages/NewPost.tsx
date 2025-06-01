import { useRef, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { createPost, sendSMS } from '@api/index';

import { checkIfAllStepsIncluded } from '@utils/checkAllAreIncluded';

import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';

import { resetApplication, setActiveScreen, setCompleteStep } from '@store/appSlice';
import { resetForm, setOtpCredentials } from '@store/formSlice';

import Button from '@ui/Button';
// import { LanguageSelection } from '@components/post/LanguageSelection';
import { StateSelection } from '@components/post/StateSelection';
import { DistrictSelection } from '@components/post/DistrictSelection';
import { CategorySelection } from '@components/post/CategorySelection';
import { SubCategorySelection } from '@components/post/SubCategorySelection';
import { PostRateAndDetails } from '@components/post/PostDetails';
import { CustomerDetails } from '@components/post/CustomerDetails';
import { OtpVerification } from '@components/post/OtpVerification'; 

import { APP_PATH, DEFAULT_POST_RATE, fullPathArray, SMS, SMS_RESPONSE } from '@common/constants';
import { OtpResponse, PostData } from '@common/types';
import { setCookie } from '@utils/setCookie';

export const NewPost = ({ activeStage = APP_PATH.STATE }) => {
    const isLoading = useRef(false);
    const { activeScreen, completeStep } = useAppSelector((state) => state.app);
    const {
        state,
        district,
        // language,
        category,
        subCategories,
        postRate,
        postDescription,
        sellRent,
        userName,
        userMobile,
        otpVerification
    } = useAppSelector((state) => state.form);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    // HouseApartmentsSubCategories
    const houseType = subCategories?.find((sub) => sub?.name === 'house-type')?.value;
    const bdRoom = subCategories?.find((sub) => sub?.name === 'bd-room')?.value;
    const custrYear = subCategories?.find((sub) => sub?.name === 'custr-year')?.value;

    // LandPlotSubCategories
    const landType = subCategories?.find((sub) => sub?.name === 'land-plot-type')?.value;

    // VehicleSubCategories
    const vehicleType = subCategories?.find((sub) => sub?.name === 'vehicle-type')?.value;
    const fuelType = subCategories?.find((sub) => sub?.name === 'fuel-type')?.value;
    const brand = subCategories?.find((sub) => sub?.name === 'brand-name')?.value;
    const seats = subCategories?.find((sub) => sub?.name === 'no-of-seat')?.value;
    const modelYear = subCategories?.find((sub) => sub?.name === 'model-year')?.value;

    const sendOtp = async () => {
        const otpResponse: OtpResponse | undefined = await sendSMS(`${userMobile}`);
        if (otpResponse && otpResponse?.responseCode === SMS_RESPONSE.SUCCESS) {
            dispatch(setOtpCredentials({
                status: false,
                id: otpResponse.verificationId,
                timeout: otpResponse.timeout
            }))
        }
    }

    const houseApparmentsValidation = useCallback(() => {
        const validate = houseType !== '' && bdRoom !== '' && `${custrYear}`?.length === 4;
        return validate;
    }, [houseType, bdRoom, custrYear]);
    
   const landPlotValidation = useCallback(() => {
       return landType && landType !== '';
   }, [landType]);

   const carValidation = useCallback(() => {
        const validate = fuelType !== '' && brand !== '' && Number(seats) > 3 && `${modelYear}`?.length === 4;
        return validate;
    }, [modelYear, brand, seats, fuelType]);

    const bikeValidation = useCallback(() => {
        const validate = fuelType !== '' && brand !== '' && Number(seats) === 2 && `${modelYear}`?.length === 4;
        return validate;
    }, [modelYear, brand, seats, fuelType]);

    const vehicleValidation = useCallback(() => {
        const validate = vehicleType !== '' && fuelType !== '' && brand !== '' && Number(seats) > 1 && `${modelYear}`?.length === 4;
        return validate;
    }, [modelYear, brand, seats, fuelType, vehicleType]);

    const handleSubCategoriesValidation = useCallback(() => {
        switch (category?.name) {
            case 'House - Apartments':
                return houseApparmentsValidation();
            case 'Land - Plots':
                return landPlotValidation();
            case 'Car':
                return carValidation();
            case 'Bike':
                return bikeValidation();
            case 'Vehicle':
                return vehicleValidation();
            default:
                return false;
        }
    }, [category?.name, houseApparmentsValidation, landPlotValidation, carValidation, bikeValidation, vehicleValidation]);

    const getSubCategories = useMemo(() => {
        return (categoryName: string) => {
            switch (categoryName) {
                case 'House - Apartments':
                    return {
                        CategoryType: subCategories?.find((sub) => sub?.name === 'house-type')?.value || '',
                        jsonData: {
                            bdRoom: subCategories?.find((sub) => sub?.name === 'bd-room')?.value || ''
                        },
                        MakeYear: subCategories?.find((sub) => sub?.name === 'custr-year')?.value || ''
                    }
                case 'Land - Plots':
                    return {
                        CategoryType: subCategories?.find((sub) => sub?.name === 'land-plot-type')?.value || '',
                    }
                case 'Car':
                    return {
                        CategoryType: 'Car',
                        jsonData: {
                            noOfSeat: subCategories?.find((sub) => sub?.name === 'no-of-seat')?.value || '',
                            brandName: subCategories?.find((sub) => sub?.name === 'brand-name')?.value || ''
                        },
                        FuelType: subCategories?.find((sub) => sub?.name === 'fuel-type')?.value || '',
                        MakeYear: subCategories?.find((sub) => sub?.name === 'model-year')?.value || ''
                    }
                case 'Bike':
                    return {
                        CategoryType: 'Bike',
                        jsonData: {
                            noOfSeat: '2',
                            brandName: subCategories?.find((sub) => sub?.name === 'brand-name')?.value || ''
                        },
                        FuelType: subCategories?.find((sub) => sub?.name === 'fuel-type')?.value || '',
                        MakeYear: subCategories?.find((sub) => sub?.name === 'model-year')?.value || ''
                    }
                case 'Vehicle':
                    return {
                        CategoryType: subCategories?.find((sub) => sub?.name === 'vehicle-type')?.value || '',
                        jsonData: {
                            noOfSeat: subCategories?.find((sub) => sub?.name === 'no-of-seat')?.value || '',
                            brandName: subCategories?.find((sub) => sub?.name === 'brand-name')?.value || ''
                        },
                        FuelType: subCategories?.find((sub) => sub?.name === 'fuel-type')?.value || '',
                        MakeYear: subCategories?.find((sub) => sub?.name === 'model-year')?.value || ''
                    }
                default:
                    return {};
            }
        };
    }, [subCategories]);

    const handleValidateFormData = useCallback(() => {
        if (state && state?.name !== '') {
            dispatch(setCompleteStep(APP_PATH.STATE));
        }
        if (district && district?.name !== '') {
            dispatch(setCompleteStep(APP_PATH.DISTRICT));
        }
        if (category && category?.name !== '') {
            dispatch(setCompleteStep(APP_PATH.CATEGORY));
        }
        if (handleSubCategoriesValidation()) {
            dispatch(setCompleteStep(APP_PATH.SUB_CATEGORY));
        }
        if (postRate && postRate > 1 && postDescription && postDescription !== '') {
            dispatch(setCompleteStep(APP_PATH.POST_DETAILS));
        }
        if (userMobile && `${userMobile}`?.length === 10 && userName && userName !== '') {
            dispatch(setCompleteStep(APP_PATH.USER));
        }
        if (otpVerification?.status) {
            dispatch(setCompleteStep(APP_PATH.OTP));
        }
    }, [state, district, category, handleSubCategoriesValidation, postRate, postDescription, userMobile, userName, otpVerification?.status, dispatch]);

    const createNewPost = useCallback(async (data: PostData) => {
        isLoading.current = true;
        const response = await createPost(data);
        if (response?.success) {
            dispatch(resetForm());
            dispatch(resetApplication());
            setTimeout(() => {
                navigate(`/image-upload/${response?.id}`);
            }, 50);
        }
    }, [dispatch, navigate]);

    const renderStep = () => {
        switch (activeScreen) {
            // case APP_PATH.LANGUAGE:
            //   return <LanguageSelection />;
            case APP_PATH.STATE:
                return <StateSelection />;
            case APP_PATH.DISTRICT:
                return <DistrictSelection />;
            case APP_PATH.CATEGORY:
                return <CategorySelection />;
            case APP_PATH.SUB_CATEGORY:
                return <SubCategorySelection />;
            case APP_PATH.POST_DETAILS:
                return <PostRateAndDetails />;
            case APP_PATH.USER:
                return <CustomerDetails />;
            case APP_PATH.OTP:
                return <OtpVerification />;
            default:
                navigate('/'); // Redirect to home if no valid screen is found
                return null;
        }
    };

    const handleNext = () => {
        switch (activeScreen) {
            // case APP_PATH.LANGUAGE:
            //   if (language) dispatch(setActiveScreen(APP_PATH.STATE));
            //   break;
            case APP_PATH.STATE:
                if (state) {
                    dispatch(setActiveScreen(APP_PATH.DISTRICT));
                }
                break;
            case APP_PATH.DISTRICT:
                dispatch(setCompleteStep(APP_PATH.STATE));
                if (district) {
                    dispatch(setActiveScreen(APP_PATH.CATEGORY));
                }
                break;
            case APP_PATH.CATEGORY:
                dispatch(setCompleteStep(APP_PATH.DISTRICT));
                if (category) {
                    dispatch(setActiveScreen(APP_PATH.SUB_CATEGORY));
                }
                break;
            case APP_PATH.SUB_CATEGORY:
                dispatch(setCompleteStep(APP_PATH.CATEGORY));
                if (handleSubCategoriesValidation()) {
                    dispatch(setActiveScreen(APP_PATH.POST_DETAILS));
                }
                break;
            case APP_PATH.POST_DETAILS:
                dispatch(setCompleteStep(APP_PATH.SUB_CATEGORY));
                if (postRate && postDescription && sellRent?.name !== '') {
                    dispatch(setActiveScreen(APP_PATH.USER));
                }
                break;
            case APP_PATH.USER:
                dispatch(setCompleteStep(APP_PATH.POST_DETAILS));
                if (userName !== '' && `${userMobile}`?.length === 10) {
                    sendOtp();
                    dispatch(setActiveScreen(APP_PATH.OTP));
                }
                break;
            default:
                return;
        }
    };
    useEffect(() => {
        if (activeScreen) {
            navigate(`/newpost/${activeScreen}`);
        }
        handleValidateFormData();
        if (activeScreen === APP_PATH.OTP) {
            dispatch(setCompleteStep(APP_PATH.USER));
            if (otpVerification?.status) {
                dispatch(setCompleteStep(APP_PATH.OTP));
            }
        }
    }, [activeScreen, otpVerification?.status, handleValidateFormData, dispatch, navigate]);

    const postTitle = useMemo(() => {
        return `${category?.name} for ${sellRent?.name} at ${district?.name} - RS: ${Number(postRate)}`;
    }, [category?.name, sellRent?.name, district?.name, postRate]);

    useEffect(() => {
        if (checkIfAllStepsIncluded(fullPathArray, completeStep) && otpVerification?.status) {
            const postData = {
                LocationName: district?.name,
                LocationId: district?.id,
                CategoryName: category?.name,
                CategoryId: category?.id,
                PostRate: Number(postRate) || DEFAULT_POST_RATE,
                SaleRent: sellRent?.name,
                Description: postDescription,
                UserName: userName,
                UserMobile: `${SMS.country}${userMobile}`,
                moreData: getSubCategories(category?.name || ''),
                title: postTitle
            };
            setCookie('LocationId', String(district?.id), 365);
            setCookie('LocationName', String(district?.name), 365);
            setCookie('mobilenumber', `+${SMS.country}${userMobile}`, 365);
            createNewPost(postData);
        }
    }, [
        completeStep,
        otpVerification?.status,
        district?.name,
        district?.id,
        category?.name,
        category?.id,
        postRate,
        sellRent?.name,
        postDescription,
        userName,
        userMobile,
        postTitle,
        getSubCategories,
        createNewPost
    ]);

    useEffect(() => {
        if (activeStage) {
            dispatch(setActiveScreen(activeStage));
        }
    }, [activeStage, dispatch])

    return (
        <div className={`relative min-h-screen bg-gray-200 ${isLoading.current ? "blur-sm" : ""} transition-all duration-300`}>
            {renderStep()}
            {activeScreen !== APP_PATH.OTP && (
                <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center bg-transparent p-4">
                    <div className="container">
                        <Button
                            variant='primary'
                            onClick={handleNext}
                            className={`px-4 py-2 bg-blue-500 ${activeScreen === APP_PATH.OTP ? 'text-blue-300 cursor-not-allowed' : 'text-gray-800'} rounded-md w-full`}
                            disabled={activeScreen === APP_PATH.OTP}
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            )}

        </div>
    );
}