import { Language } from '@common/types';

import { 
  Home,SquareDashedBottom, Bike, Car, Truck,
  HandCoins, Key,
  ArrowRight, ArrowLeft, MapPin, Heart, ExternalLink, Search, MessageSquare, CheckCircle, Upload, X, AlertCircle, Clock, Image, File, ImageIcon, Check, Trash2, FileText, Facebook, MessageCircleMore, Mail, User, Menu, ShoppingBag, LogIn, RefreshCw, Loader2, Calendar, ChevronDown, Share2, Flag,   Phone, ChevronLeft, ChevronRight
} from 'lucide-react';

export const iconComponents = {
  // categories
  Home: Home,
  Land: SquareDashedBottom,
  Bike: Bike,
  Car: Car,
  Truck: Truck,

  // sell-rent
  Sell: HandCoins,
  Rent: Key,

  // other
  ArrowRightIcon: ArrowRight,
  ArrowLeftIcon: ArrowLeft,
  MapIcon: MapPin,
  HeartIcon: Heart,
  ExternalLinkIcon: ExternalLink,
  SearchIcon: Search,
  MessageIcon: MessageSquare,
  CheckCircleIcon: CheckCircle,
  UploadIcon: Upload,
  XIcon: X,
  AlertCircleIcon: AlertCircle,
  ClockIcon: Clock,
  ImageIcon: Image,
  FileIcon: File,
  ImagesIcon: ImageIcon,
  CheckIcon: Check,
  Trash2Icon: Trash2,
  FileTextIcon: FileText,
  FacebookIcon: Facebook,
  MessageCircleIcon: MessageCircleMore,
  MailIcon: Mail,
  UserIcon: User,
  MenuIcon: Menu,
  ShoppingBagIcon: ShoppingBag,
  LogInIcon: LogIn,
  RefreshIcon: RefreshCw,
  LoaderIcon: Loader2,
  CalendarIcon: Calendar,
  ChevronDownIcon: ChevronDown,
  ShareIcon: Share2,
  FlagIcon: Flag,
  PhoneIcon: Phone,
  ChevronLeftIcon: ChevronLeft,
  ChevronRightIcon: ChevronRight
};

export const LANGUAGES: Language[] = [
  {
    id: 'en',
    name: 'English',
    nativeName: 'English',
    icon: 'EN',
  },
  {
    id: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    icon: 'HI',
  },
  {
    id: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    icon: 'ML',
  },
  {
    id: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    icon: 'TA',
  },
  {
    id: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    icon: 'TE',
  },
  {
    id: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    icon: 'KN',
  },
  {
    id: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    icon: 'BE',
  },
  {
    id: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    icon: 'MR',
  },
  {
    id: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    icon: 'GU',
  },
  {
    id: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    icon: 'PA',
  },
  {
    id: 'or',
    name: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    icon: 'OD',
  }
];

export const APP_PATH = {
  STATE: 'state',
  DISTRICT: 'district',
  LANGUAGE: 'language',
  CATEGORY: 'category',
  SUB_CATEGORY: 'subCategory',
  POST_DETAILS: 'postDetails',
  USER: 'user',
  OTP: 'otpValidation'
}

export const fullPathArray : string[] = [
  // APP_PATH.LANGUAGE,
  APP_PATH.STATE,
  APP_PATH.DISTRICT,
  APP_PATH.CATEGORY,
  APP_PATH.SUB_CATEGORY,
  APP_PATH.POST_DETAILS,
  APP_PATH.USER,
  APP_PATH.OTP
]

export const DEFAULT_POST_RATE : number = 500

export const ONCE = [
  '',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Eleven',
  'Twelve',
  'Thirteen',
  'Fourteen',
  'Fifteen',
  'Sixteen',
  'Seventeen',
  'Eighteen',
  'Nineteen'
];

export const TENS = [
  '',
  '',
  'Twenty',
  'Thirty',
  'Forty',
  'Fifty',
  'Sixty',
  'Seventy',
  'Eighty',
  'Ninety'
];

export const SCALES = [
  '',
  'Hundred',
  'Thousand',
  'Lakh',
  'Crore'
];

export const SMS = {
  country: '91',
  scope: 'NEW',
  email: 'test@messagecentral.com',
  senderId: 'UTOMOB',
  type: 'SMS',
  flowType: 'SMS',
  defaultMessage: 'Welcome to Message Central. We are delighted to have you here! - Powered by U2opia',
}

export const SMS_RESPONSE = {
  SUCCESS: '200',
  BAD_REQUEST: '400',
  DUPLICATE_RESOURCE: '409',
  SERVER_ERROR: '500',
  INVALID_CUSTOMER_ID: '501',
  INVALID_VERIFICATION_ID: '505',
  REQUEST_ALREADY_EXISTS: '506',
  INVALID_COUNTRY_CODE: '511',
  VERIFICATION_FAILED: '700',
  WRONG_OTP_PROVIDED: '702',
  ALREADY_VERIFIED: '703',
  VERIFICATION_EXPIRED: '705',
  MAXIMUM_LIMIT_REACHED: '800'
}

export const LAND_PLOT_TYPE = [
  {
    "id": 1,
    "name": "Residential",
    "icon": "R"
  },
  {
    "id": 2,
    "name": "Commercial",
    "icon": "C"
  },
  {
    "id": 3,
    "name": "Agricultural",
    "icon": "A"
  }
];

export const HOUSE_TYPE = [
  {
    "id": 1,
    "name": "Apartment",
    "icon": "A"
  },
  {
    "id": 2,
    "name": "Villa",
    "icon": "V"
  },
  {
    "id": 3,
    "name": "House",
    "icon": "H"
  }
];

export const HOUSE_BD_NUM = [
  {
    "id": 1,
    "name": "1",
    "icon": "1"
  },
  {
    "id": 2,
    "name": "2",
    "icon": "2"
  },
  {
    "id": 3,
    "name": "3",
    "icon": "3"
  },
  {
    "id": 4,
    "name": "4",
    "icon": "4"
  },
  {
    "id": 5,
    "name": "4+",
    "icon": "4+"
  }
];

export const VEHICLE_TYPE = [
  {
    "id": 1,
    "name": "Auto",
    "icon": "A"
  },
  {
    "id": 2,
    "name": "Passenger",
    "icon": "P"
  },
  {
    "id": 3,
    "name": "Commercial",
    "icon": "C"
  },
  {
    "id": 4,
    "name": "Others",
    "icon": "O"
  }
];

export const FUEL_TYPE = [
  {
    "id": 1,
    "name": "Petrol",
    "icon": "P"
  },
  {
    "id": 2,
    "name": "Diesel",
    "icon": "D"
  },
  {
    "id": 3,
    "name": "Electric",
    "icon": "E"
  },
  {
    "id": 4,
    "name": "CNG",
    "icon": "C"
  }
];

export const SELL_RENT = [
  {
    "id": 1,
    "name": "Sell",
    "icon": "Sell"
  },
  {
    "id": 2,
    "name": "Rent",
    "icon": "Rent"
  }
];
