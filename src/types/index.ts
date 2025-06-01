export interface State {
  id: number;
  name: string;
  nativeName: string;
}

export interface District {
  id: number;
  name: string;
  nativeName?: string;
  link?: string;
}

export interface Language {
  id: string;
  name: string;
  nativeName?: string;
  icon: string;
}

export interface Product {
  id: string;
  title: string;
  local_title?: string;
  price: number;
  description: string;
  category: string;
  location: District;
  images: string[];
  seller: {
    id: string;
    name: string;
    number?: string
  };
  createdAt: string;
  featured?: boolean;
  view?: number
}

export interface Category {
  id: number;
  name: string;
  icon?: string;
  count?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  avatar?: string;
  listings?: Product[];
  favorites?: string[];
}

export type SortOption = 'newest' | 'price-low-high' | 'price-high-low' | 'popular';

export interface FilterOptions {
  category?: string;
  priceRange?: [number, number];
  location?: string;
  sort?: SortOption;
}

export interface SubCategoryItem {
  id: number;
  name: string;
  icon: string;
}

export interface SubCategories {
  id: number;
  name: string;
  itemType: string;
  items?: SubCategoryItem[];
}

export interface SubCategory {
  categoryId: number;
  subCategory: SubCategories[];
}

export interface SubCategoryData {
  value: string;
  name: string
}

export interface Errors {
  id?: string;
  error?: string;
}

export interface CommonData {
  activeScreen: string;
  smsToken: string;
  completeStep: string[];
  categories: Category[];
  products: Product[];
  districts: District[]
}

export interface ApiResponse<T> {
  data: T[];
  error?: string;
}

export interface SweetAlertResult {
  isConfirmed: boolean;
  isDismissed: boolean;
  value?: string; // In case of a prompt input, for example
}

export interface OTPInputProps {
  length: number;
  onComplete: (otp: string) => void;
  autoFocus?: boolean;
  isDisabled?: boolean;
  isError?: boolean;
  className?: string;
  clear?: boolean;
}

export interface OTPDigitInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  id: string;
  isDisabled?: boolean;
  isError?: boolean;
  isActive: boolean;
  autoFocus?: boolean;
}

export interface VerificationState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export interface OTPFormProps {
  onSubmit: (otp: string) => Promise<void>;
  length?: number;
  resendOTP?: () => void;
  resendCountdown?: number;
  phoneNumber?: string;
}

export interface OtpCredentials {
  id?: string;
  timeout?: string;
  status: boolean;
}

export interface SellRent {
  id: number;
  name: string;
  icon: string;
}

export interface FormData {
  state?: State;
  district?: District;
  language?: Language;
  category?: Category;
  subCategories?: SubCategoryData[];
  postRate?: number;
  sellRent?: SellRent;
  userName?: string;
  userMobile?: number;
  postDescription?: string;
  errors?: Errors[],
  otpVerification: OtpCredentials
}

export interface OtpResponse {
  verificationId: string;         // Verification ID (string)
  mobileNumber: string;           // Mobile number (string)
  responseCode: string;           // Response code (string, e.g., '200')
  errorMessage: string | null;    // Error message (string or null)
  timeout: string;                // Timeout (string, e.g., '60')
  smCLI: string | null;           // SMCLI (string or null)
  transactionId: string;          // Transaction ID (string)
}

export interface VerificationResponse {
  verificationId: string;
  mobileNumber: string;
  responseCode: string;
  errorMessage: string | null;
  verificationStatus: string;
  authToken: string | null;
  transactionId: string;
}

export interface PostData {
  LocationName?: string;
  LocationId?: string | number; // Assuming ID could be string or number
  CategoryName?: string;
  CategoryId?: string | number;
  PostRate: number;
  SaleRent?: string;
  Description?: string;
  UserName?: string;
  UserMobile?: string;
  JsonData?: unknown;
  title?: string;
}

export interface PostResponse {
  success: boolean;
  message: string;
  id?: string; // because base64_encode($PostId) returns a string
}

// File statuses
export type FileStatus = 'pending' | 'uploading' | 'success' | 'error';

// File metadata
export interface FileMetadata {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt?: Date;
  status: FileStatus;
  progress: number;
  url?: string;
  reference?: string;
  error?: string;
}

// Upload service response
export interface UploadResponse {
  success: boolean;
  fileUrl: string;
  reference: string;
  error?: string;
}

// PHP API response
export interface PHPApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export interface PostAssets {
  Id: number,
  PostId: number,
  AssetType: string,
  AssetUrl: string,
  ApprovedStatus: string,
  Base: string,
  FileDetails: FileMetadata
}

export interface PromotionOrderPayload {
  productReferenceId: number | string;
  amount: number;
  districts: string[];
  productType: "Post" | "User";
  promoteType: "Whats-App Promote" | "Social-Media Promote" | "Whats-App Status Promote" | "Post Create By Agent" | "Post Create By Self" | "Pro Membership" | "Prime Membership";
  referenceInfo: string;
  productName: string;
  promoteTypeAction: string;
}

export interface PromotionResponse {
  status: boolean;
  orderId: number | string;
  orderAmount: number;
  mobileNumber: string;
  userId: number | string;
}

export interface PhonePePayload {
  orderId: string | number,
  orderAmount: number,
  mobileNumber: string,
  userId: string | number,
  merchantTransactionId: string
}

export interface PhonePeResponse {
  url: string;
}

export interface PaymentStatusResponse {
  code: string;
  message: string;
  data: {
    merchantTransactionId: string;
    transactionId: string;
    paymentInstrument: {
      utr: string;
    };
  };
}

export interface AuthData {
  authToken: string | null;
  authMobile: string
  otp: OtpCredentials
}

export interface AuthLoginResponse {
  token: string | null;
  authMobile: string
}