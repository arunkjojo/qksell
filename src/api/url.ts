const API_BASE_URL = 'https://qksell.in/apis/v3';

// OTP Services
// const GENERATE_TOKON = "auth/v1/authentication/token";
// const SEND_OPT = "verification/v3/send";
// const VALIDATE_OPT = "verification/v3/validateOtp/";

// SMS API urls
// export const getOtpTokenUrl = `${SMS_API_URL}/${GENERATE_TOKON}`;
// export const sendOtpUrl = `${SMS_API_URL}/${SEND_OPT}`;
// export const validateOtpUrl = `${SMS_API_URL}/${VALIDATE_OPT}`;

// Application APIs
const LOCATIONS = "locations.php";
const LOCATIONS_BY_ID = "locations.php?pid={id}";
const CATEGORIES = "category.php";
const SEND_OTP = "sendOtp.php";
const VALIDATE_OPT = "verifyOtp.php";
const CREATE_POST = "newPost.php";
const POST_IMAGE = "postImage.php";
const POST_IMAGE_BY_ID = "postImageById.php";
const LATEST_POST = "latestPost.php";
const POST_BY_ID = "postById.php";
const SIMILAR_POST_BY_ID = "similarPostById.php";
const DISTRICT_BY_ID = "districtById.php";
const PROMOTION = "promotion.php";
const PHONEPE = "phonepe.php";
const PHONEPE_STATUS = "phonepeStatus.php";
const UPDATE_ORDER = "successPayment.php";
const UPDATE_STATUS = "phonepeStatusUpdate.php";

const LOGIN = "login.php";
const CATEGORY_POST_LIST = "categoryPost.php";
const LOCATION_POST_LIST = "locationPost.php";
const ALL_DISTRICTS = "allDistricts.php";
const USER_POST_LIST = "userPost.php";

// Application API urls
export const getLocationsUrl = `${API_BASE_URL}/${LOCATIONS}`;
export const getLocationsByIdUrl = `${API_BASE_URL}/${LOCATIONS_BY_ID}`;
export const getCategoriesUrl = `${API_BASE_URL}/${CATEGORIES}`;

export const sendOtpUrl = `${API_BASE_URL}/${SEND_OTP}`;
export const validateOtpUrl = `${API_BASE_URL}/${VALIDATE_OPT}`;

export const createPostUrl = `${API_BASE_URL}/${CREATE_POST}`;
export const postImgeUrl = `${API_BASE_URL}/${POST_IMAGE}`;
export const postImgeByIdUrl = `${API_BASE_URL}/${POST_IMAGE_BY_ID}`;

export const getLatestPostUrl = `${API_BASE_URL}/${LATEST_POST}`;
export const getPostByIdUrl = `${API_BASE_URL}/${POST_BY_ID}`;
export const getSimilarPostByIdUrl = `${API_BASE_URL}/${SIMILAR_POST_BY_ID}`;

export const getDistrictByIdUrl = `${API_BASE_URL}/${DISTRICT_BY_ID}`;

export const promotionUrl = `${API_BASE_URL}/${PROMOTION}`;
export const paymentUrl = `${API_BASE_URL}/${PHONEPE}`;
export const getPaymentStatusUrl = `${API_BASE_URL}/${PHONEPE_STATUS}`;
export const updateOrderStatusUrl = `${API_BASE_URL}/${UPDATE_ORDER}`;
export const updatePaymentStatusUrl = `${API_BASE_URL}/${UPDATE_STATUS}`;

export const authLoginUrl = `${API_BASE_URL}/${LOGIN}`;

export const getPostListByCategoryUrl = `${API_BASE_URL}/${CATEGORY_POST_LIST}`;
export const getPostListByLocationUrl = `${API_BASE_URL}/${LOCATION_POST_LIST}`;
export const getAllDistrictsUrl = `${API_BASE_URL}/${ALL_DISTRICTS}`;
export const getUserPostListUrl = `${API_BASE_URL}/${USER_POST_LIST}`;
