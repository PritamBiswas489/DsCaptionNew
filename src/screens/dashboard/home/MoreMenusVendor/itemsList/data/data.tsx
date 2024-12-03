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
    goToScreen:'VendorProfileSettings'
  },
  {
    icon: <AddItemIcon height={'36'} width={'36'} />,
    title: 'newDeveloper.AddItem', 
    goToScreen:'VendorAddItem'
  },
  {
    icon: <AddItemIcon height={'36'} width={'36'} />,
    title: 'Edit item 32820 fashion', 
    goToScreen:'VendorEditItem_32820'
  },
  {
    icon: <AddItemIcon height={'36'} width={'36'} />,
    title: 'Edit item 32822 food', 
    goToScreen:'VendorEditItem_32822'
  },
  {
    icon: <AddItemIcon height={'36'} width={'36'} />,
    title: 'About us (For Testing)', 
    goToScreen:'AboutUsContent'
  },

  {
    icon: <AddItemIcon height={'36'} width={'36'} />,
    title: 'Privacy Policy (For Testing)', 
    goToScreen:'PrivacyPolicyContent'
     
  },
   
  {
    icon: <AddItemIcon height={'36'} width={'36'} />,
    title: 'Terms and conditions (For Testing)', 
    goToScreen:'TermsAndConditionsContent'
     
  },
  //
  {
    icon: <AddItemIcon height={'36'} width={'36'} />,
    title: 'Update  Announcement (For Testing)', 
    goToScreen:'StoreUpdateAnnouncement'
     
  },

  {
    icon: <AddItemIcon height={'36'} width={'36'} />,
    title: 'Store settings (For Testing)', 
    goToScreen:'StoreSettings'
  },

  {
    icon: <AddItemIcon height={'36'} width={'36'} />,
    title: 'Add Coupon (For Testing)', 
    goToScreen:'StoreAddCoupon'
  },

  {
    icon: <AddItemIcon height={'36'} width={'36'} />,
    title: 'Schedule food store (For Testing)', 
    goToScreen:'StoreScheduleSettings'
  },

  {
    icon: <AddItemIcon height={'36'} width={'36'} />,
    title: 'Addon food store (For Testing)', 
    goToScreen:'VendorCreateAddons'
    
    
  },


   
  {
    icon: <PendingItemIcon height={'36'} width={'36'} />,
    title: 'newDeveloper.PendingItem', 
  },
  { 
    icon: <CategoriesIcon height={'36'} width={'36'} />,
    title: 'newDeveloper.Categories', 
    goToScreen:'Categories'
  },
  { 
    icon: <BannerIcon height={'36'} width={'36'} />,
    title: 'newDeveloper.Banner', 
    goToScreen:'VendorAddNewBanner'
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
    icon: <TermsConditionsIcon height={'36'} width={'36'} />,
    title: 'Notifications',
     goToScreen:'NotificationVendor'
  },
  {
    icon: <LogoutIcon height={'36'} width={'36'} />,
    title: 'newDeveloper.moreMenuLogout',
    goToScreen:'logoutProcess'
  },
];
