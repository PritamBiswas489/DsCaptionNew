import React, {useState} from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import {GlobalStyle} from '@style/styles';
import Header from '@commonComponents/header';
import {windowHeight} from '@theme/appConstant';
import {AppSetting, Delete} from '@utils/icons';
import ModalComponent from '@commonComponents/modal';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/navigation/types';
import {useNavigation} from '@react-navigation/native';
import {useValues} from '../../../../../App';
import appColors from '@theme/appColors';
import {SettingList} from './settingList';
import {SettingInfo} from './settingInfo';
import { CommissionBig } from '@utils/icons';
import { useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@src/store';

type routeProps = NativeStackNavigationProp<RootStackParamList>;
export function Setting() {
  const {isDark, t} = useValues();
  const {navigate} = useNavigation<routeProps>();
  const [showDeleteModal, setModalVisible] = useState(false);
  const [showCommissionModal,setCommissionModal] =  useState(false)
  const { default_commission } = useSelector((state: RootState) => state['providerAppConfig'])
  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: windowHeight(3)}}
      style={[
        GlobalStyle.mainView,
        {backgroundColor: isDark ? appColors.darkTheme : appColors.white},
      ]}
      showsVerticalScrollIndicator={false}>
      <Header
        title="profileSetting.profileSetting"
        trailIcon={<AppSetting />}
        showBackArrow={true}
        gotoScreen={() => navigate('AppSetting')}
        containerStyle={{
          paddingVertical: windowHeight(4),
        }}
      />
      <SettingInfo />
      <SettingList setModalVisible={setModalVisible}  setCommissionModal={setCommissionModal} />
      <ModalComponent
        icon={<Delete color={appColors.error} height={'60'} width={'60'} />}
        visible={showDeleteModal}
        onClose={() => setModalVisible(false)}
        success={false}
        title="profileSetting.deleteAccount"
        content="profileSetting.deleteConfirmation"
        btnTitle="profileSetting.delete"
        gotoScreen={() => setModalVisible(false)}
        showText={t('wallet.cancel')}
        onShowText={() => setModalVisible(false)}
      />

    <ModalComponent
        visible={showCommissionModal}
        onClose={() => setCommissionModal(false)}
        success={false}
        icon={<CommissionBig/>}
        title={`${t('newDeveloper.PercentageText')}: ${default_commission}%`}
        content={`${t('newDeveloper.PercentageContent')}`}
        btnTitle="common.okay"
        gotoScreen={()=>setCommissionModal(false)}
      />
    </ScrollView>
  );
}
