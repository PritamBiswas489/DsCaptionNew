import {ImageSourcePropType} from 'react-native';
import {Float} from 'react-native/Libraries/Types/CodegenTypes';

export type newAddressProp = {
  addressData: any;
};

export type addNewAreaProps = {
  latitude?: number | null;
  longitude?: number | null;
  screen?: String;
  locationData?: locationType;
};

export type locationType = {
  id: number;
  address: string;
  country: string;
  status?: boolean;
};

export type locationProp = {
  data: locationType | any;
};

export type BlogType = {
  blogImage: ImageSourcePropType;
  title: string;
  detail: string;
  date: string;
  author: string;
  totalPost: number;
};

export type BlogDetailScreenProp = {
  blogData?: BlogType | any;
};

export type OngoingBookingProp = {
  extraCharges: {
    name: string;
    amount: string;
    noService: number;
  };
};

export type serviceProofProp = {
  serviceProofData: {
    serviceTitle: string;
    details: string;
    image: string;
  };
};

export type documentProps = {
  image: ImageSourcePropType;
};

export type packageDetailProp = {
  packagesData: {
    title: string;
    startDate: string;
    endDate: string;
    totalService: number;
    price: Float;
  };
};

export type CurrentLocationProp = {
  screen: string;
};

export type commissionDetailProps = {
  title: string;
};

export type loginProps = {
  serviceMenLogin: boolean;
};
export type RootStackParamList = {
  NoInternet: undefined;
  AuthNavigation: undefined;
  IntroSlider: undefined;
  Login: loginProps | undefined;
  ForgotPassword: undefined;
  VerifyOtp: undefined;
  ResetPassword: undefined;
  CompanyDetails: undefined;
  CompanyLocation: undefined;
  AddressCurrentLocation:undefined;
  ProviderDetails: undefined;
  Register: locationProp | undefined;
  CurrentLocation: CurrentLocationProp | undefined;
  AddNewArea: addNewAreaProps | undefined;
  Subscription: undefined;
  SubscriptionPlan: undefined;
  BottomTab: undefined;
  Earnings: undefined;
  History: undefined;
  AddNewService: undefined;
  Notification: undefined;
  EmptyNotification: undefined;
  ServiceList: undefined;
  ServiceDetail: undefined;
  LocationList: undefined;
  AddNewAddress: newAddressProp;
  FreelancerDetail: undefined;
  SplashScreen: undefined;
  Reviews: undefined;
  Categories: undefined;
  ServiceMenList: undefined;
  AddNewServiceMen: undefined;
  LatestBlog: undefined;
  BlogDetail: BlogDetailScreenProp;
  PopularServiceView: undefined;
  ServiceMenDetail: undefined;
  Booking: undefined;
  PendingBooking: undefined;
  OngoingBooking: OngoingBookingProp | undefined;
  AcceptedBooking: undefined;
  CompletedBooking: serviceProofProp;
  CancelledBooking: undefined;
  AssignedBooking: undefined;
  PendingApproval: undefined;
  HoldBooking: undefined;
  MapView: undefined;
  Chat: undefined;
  MultipleServiceMenList: undefined;
  AddExtraCharges: undefined;
  ServiceProof: serviceProofProp;
  CancelBooking: undefined;
  AppSetting: undefined;
  ChangeLanguage: undefined;
  ChangeCurrency: undefined;
  ChangePassword: undefined;
  CompanyDetail: locationProp;
  UserProfileSetting: undefined;
  BankDetails: undefined;
  IdVerification: undefined;
  DocumentPreview: documentProps;
  CommissionHistory: undefined;
  Packages: undefined;
  AddPackage: packageDetailProp | undefined;
  PackageDetail: undefined;
  TimeSlots: undefined;
  BookingDetails: undefined;
  CommissionInfo: undefined;
  CommissionDetail: commissionDetailProps;
  Cart: undefined;
  ChatHistory: undefined;
  ProviderInfo: undefined;
  FreeLancerDetails: undefined;
  LoaderScreen: undefined;
};
