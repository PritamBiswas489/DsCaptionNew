import {
  Password,
  Currency,
  DarkTheme,
  LanguageTranslator,
  Notification,
} from '@utils/icons';
import {settingItemType} from './types';
import appColors from '@theme/appColors';

export const profileSettingData: Array<settingItemType> = [
  {
    icon: <DarkTheme />,
    name: 'profileSetting.darkTheme',
    showArrowIcon: false,
    darkIcon: <DarkTheme color={appColors.white} />,
  },
  {
    icon: <Notification />,
    name: 'profileSetting.updateNotification',
    showArrowIcon: false,
    darkIcon: <Notification color={appColors.white} />,
  },
  {
    icon: <Currency />,
    name: 'profileSetting.changeCurrency',
    subTitle: 'profileSetting.usDollar',
    gotoScreen: 'ChangeCurrency',
    showArrowIcon: true,
    darkIcon: <Currency color={appColors.white} />,
  },
  {
    icon: <LanguageTranslator />,
    name: 'profileSetting.changeLanguage',
    subTitle: 'providerDetail.english',
    gotoScreen: 'ChangeLanguage',
    showArrowIcon: true,
    darkIcon: <LanguageTranslator color={appColors.white} />,
  },
  {
    icon: <Password color={appColors.darkText} />,
    name: 'profileSetting.changePassword',
    gotoScreen: 'ChangePassword',
    showArrowIcon: true,
    darkIcon: <Password color={appColors.white} />,
  },
];
