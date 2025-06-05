import axios, { AxiosResponse } from 'axios';
import type { ApiResponse, AuthLoginResponse, Category, District, OtpResponse, PaginatedData, PaymentStatusResponse, PhonePePayload, PhonePeResponse, PostData, PostResponse, Product, PromotionOrderPayload, PromotionResponse, State, VerificationResponse } from '@common/types';
import { setIdparamsToApi } from '@utils/apiParams';
import { displayStatus } from '@utils/displayStatus';
import { authLoginUrl, createPostUrl, getCategoriesUrl, getDistrictByIdUrl, getLatestPostUrl, getLocationsByIdUrl, getLocationsUrl, getPaymentStatusUrl, getPostByIdUrl, getPostListByCategoryUrl, getSimilarPostByIdUrl, paymentUrl, postImgeByIdUrl, postImgeUrl, promotionUrl, sendOtpUrl, updateOrderStatusUrl, updatePaymentStatusUrl, validateOtpUrl } from './url';


export async function fetchStates(): Promise<ApiResponse<State>> {
  try {
    const response = await fetch(getLocationsUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch states');
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    return { data: [], error: (error as Error).message };
  }
}

export async function fetchDistricts(stateId: string): Promise<ApiResponse<District>> {
  try {
    const apiUrl = setIdparamsToApi(getLocationsByIdUrl, stateId);
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch districts');
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    return { data: [], error: (error as Error).message };
  }
}

export async function fetchCategories(): Promise<ApiResponse<Category>> {
  try {
    const response = await fetch(getCategoriesUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch category');
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    return { data: [], error: (error as Error).message };
  }
}

export async function sendSMS(mobileNumber: string): Promise<OtpResponse | undefined> {
  try {
    const response: AxiosResponse = await axios.post(sendOtpUrl, { mobileNumber });
    return response.data.data;
  } catch (error) {
    console.error('Error sending OTP:', error);
  }
}

export async function validateOtp(
  verificationId: string,
  code: string,
  mobileNumber: string
): Promise<VerificationResponse | undefined> {
  try {
    const response: AxiosResponse = await axios.post(validateOtpUrl, {
      verificationId,
      code,
      mobileNumber
    });
    return response.data.data;
  } catch (error) {
    console.error('Error validating OTP:', error);
    return;
  }
}

export async function createPost(postData: PostData): Promise<PostResponse | undefined> {
  try {
    const response: AxiosResponse = await axios.post(createPostUrl, { postData });
    return response.data;
  } catch (error) {
    console.error('Error sending OTP:', error);
    return undefined;
  }
}

export async function uploadPostImageReference(postId: number | string, assetUrl: string, fileDetails: string): Promise<PostResponse | undefined> {
  try {
    const payload = {
      function_name: 'InsertAssets',
      postId,
      assetUrl,
      fileDetails
    };

    const response: AxiosResponse<PostResponse> = await axios.post(postImgeUrl, payload);
    return response?.data;
  } catch (error) {
    console.error('Error uploading image reference:', error);
    return undefined;
  }
}

export const fetchPostImageById = async (postId: string): Promise<PostResponse | undefined> => {
  try {
    const PostId = parseInt(postId, 10);
    const params = new URLSearchParams();
    if (PostId && !isNaN(PostId)) params.append('postId', PostId.toString());
    const response: AxiosResponse<PostResponse> = await axios.get(`${postImgeByIdUrl}?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching image:', error);
    return undefined;
  }
};

export async function deletePostAsset(postId: number | string, assetId: number | string): Promise<boolean> {
  try {
    const payload = {
      function_name: 'deleteAsset',
      postId,
      assetId,
    };

    const response = await axios.post(postImgeUrl, payload);
    return response.data.status === 'deleted';
  } catch (error) {
    console.error('Error deleting asset:', error);
    return false;
  }
}

export async function fetchLatestPost(
  categoryId: number | null = null,
  locationId: number | null = null,
  limit: number = 16
): Promise<ApiResponse<Product>> {
  try {
    const params = new URLSearchParams();
    if (categoryId !== null) params.append('categoryId', categoryId.toString());
    if (locationId !== null) params.append('locationId', locationId.toString());
    if (limit !== null) params.append('limit', limit.toString());

    const response = await fetch(`${getLatestPostUrl}?${params.toString()}`);

    if (!response.ok) {
      throw new Error('Failed to fetch latest posts');
    }

    const data: Product[] = await response.json();

    return { data: data };
  } catch (error) {
    return { data: [], error: (error as Error).message };
  }
}

export async function fetchPostById(Id: number): Promise<ApiResponse<Product>> {
  try {
    const params = new URLSearchParams();
    params.append('Id', Id.toString());

    const response = await fetch(`${getPostByIdUrl}?${params.toString()}`);

    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }

    const data: Product[] = await response.json();

    return { data: data };
  } catch (error) {
    return { data: [], error: (error as Error).message };
  }
}

export async function fetchSimilarPostById(Id: number): Promise<ApiResponse<Product>> {
  try {
    const params = new URLSearchParams();
    params.append('Id', Id.toString());

    const response = await fetch(`${getSimilarPostByIdUrl}?${params.toString()}`);

    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }

    const data: Product[] = await response.json();

    return { data: data };
  } catch (error) {
    return { data: [], error: (error as Error).message };
  }
}

export async function fetchDistrictById(Id: number): Promise<ApiResponse<District>> {
  try {
    const params = new URLSearchParams();
    params.append('Id', Id.toString());

    const response = await fetch(`${getDistrictByIdUrl}?${params.toString()}`);

    if (!response.ok) {
      throw new Error('Failed to fetch districts');
    }

    const data: District[] = await response.json();

    return { data: data };
  } catch (error) {
    return { data: [], error: (error as Error).message };
  }
}

export async function promotion(payload: PromotionOrderPayload): Promise<PromotionResponse | undefined> {
  try {
    const response: AxiosResponse<PromotionResponse> = await axios.post(promotionUrl, { payload });

    const result = response.data;

    if (result?.status) {
      return result;
    }
  } catch (error) {
    console.error('Error in promotion:', error);
  }

  return undefined;
}

export async function phonePeNow(payload: PhonePePayload): Promise<PhonePeResponse | null> {
  try {
    const response = await axios.get<PhonePeResponse>(`${paymentUrl}`, {
      params: {
        v: Date.now(),
        mobileNumber: payload.mobileNumber,
        merchantUserId: payload.userId,
        merchantTransactionId: payload.merchantTransactionId,
        orderId: payload.orderId,
        amount: payload.orderAmount,
      },
    });

    return response.data;
  } catch (error) {
    console.error('phonePeNow error:', error);
    return null;
  }
}

export async function checkStatus(orderId: string | number, merchantTransactionId: string): Promise<void> {
  try {
    const statusRes = await axios.get<PaymentStatusResponse>(`${getPaymentStatusUrl}`, {
      params: {
        v: Date.now(),
        merchantTransactionId,
      },
    });

    const statusResponse = statusRes.data;

    await axios.post(`${updateOrderStatusUrl}`, {
      orderId: btoa(orderId.toString()),
      paymentOrdId: btoa(statusResponse.data.merchantTransactionId),
      paymentRefId: btoa(statusResponse.data.paymentInstrument.utr),
    });

    await updatePaymentStatus(statusResponse, orderId);
  } catch (error) {
    console.error('Error in checkStatus:', error);
    window.location.reload();
  }
}

async function updatePaymentStatus(statusResponse: PaymentStatusResponse, orderId: string | number): Promise<void> {
  try {
    const res = await axios.get<string>(`${updatePaymentStatusUrl}?orderId=${orderId}`);
    const redirectUrl = res.data.toString();
    displayStatus(statusResponse, redirectUrl);
  } catch (error) {
    console.error('Error updating payment status:', error);
  }
}

export async function authLogin(mobile: string): Promise<AuthLoginResponse | undefined> {
  try {
    const response: AxiosResponse = await axios.post(authLoginUrl, { mobile });
    return response.data;
  } catch (error) {
    console.error('Error login:', error);
    return undefined;
  }
}

export async function getPostListByCategory({
  cname,
  page,
  limit
}: {
  cname: string;
  page: number;
  limit: number;
}): Promise<ApiResponse<PaginatedData<Product>>> {
  const params = new URLSearchParams({
    cname: cname.toString(),
    page: page.toString(),
    limit: limit.toString()
  });

  try {
    const response = await fetch(`${getPostListByCategoryUrl}?${params}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    const json: PaginatedData<Product> = await response.json();

    return { data: [json], error: '' };
  } catch (error) {
    return {
      data: [],
      error: (error as Error).message
    };
  }
}