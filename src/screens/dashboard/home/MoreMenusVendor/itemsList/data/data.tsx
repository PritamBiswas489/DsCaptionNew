import {
  AcRepair,
 
   
  Painting,
  
  Salon,
  ProfileIcon,
  SubscriptionsIcon,
  ChatIcon,
  SettingIcon,
  WithdrawListIcon,
  PaymentIcon,
  ReportsIcon,
  AboutUsIcon,
  PrivacyPolicyIcon,
  TermsConditionsIcon,
  RefundPolicyIcon,
  LogoutIcon,
  AddItemIcon,
  PendingItemIcon,
  CategoriesIcon,
  BannerIcon,
  CampaignIcon,
  CouponIcon
} from '@utils/icons';
import {HomeCategoryType} from './types';


export const categoriesData: Array<HomeCategoryType> = [
  {
    icon: <ProfileIcon height={'36'} width={'36'} />,
    title: 'newDeveloper.moreMenuProfile', 
  },
  {
    icon: <AddItemIcon height={'36'} width={'36'} />,
    title: 'newDeveloper.AddItem', 
  },
  {
    icon: <PendingItemIcon height={'36'} width={'36'} />,
    title: 'newDeveloper.PendingItem', 
  },
 
  { 
    icon: <CategoriesIcon height={'36'} width={'36'} />,
    title: 'newDeveloper.Categories', 
  },
  { 
    icon: <BannerIcon height={'36'} width={'36'} />,
    title: 'newDeveloper.Banner', 
  },
  { 
    icon: <CampaignIcon height={'36'} width={'36'} />,
    title: 'newDeveloper.Campaign',
  },
  { 
    icon: <ChatIcon height={'36'} width={'36'} />,
    title: 'newDeveloper.Conversation',
  },
  {
    icon: <SettingIcon height={'36'} width={'36'} />,
    title: 'newDeveloper.moreMenuSettings',
    goToScreen:'AppSetting'
  },
  // PaymentList
  {
    icon: <ReportsIcon height={'36'} width={'36'} />,
    title: 'newDeveloper.ExpenseReport',
  },
  {
    icon: <CouponIcon height={'36'} width={'36'} />,
    title: 'newDeveloper.Coupon',
  },
  {
    icon: <PrivacyPolicyIcon height={'36'} width={'36'} />,
    title: 'newDeveloper.moreMenuPrivacyPolicy',
  },
  {
    icon: <TermsConditionsIcon height={'36'} width={'36'} />,
    title: 'newDeveloper.moreMenuTermsandconditions',
  },
  {
    icon: <LogoutIcon height={'36'} width={'36'} />,
    title: 'newDeveloper.moreMenuLogout',
    goToScreen:'logoutProcess'
  },
];
