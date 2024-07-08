import React, {useState} from 'react';
import {ScrollView} from 'react-native';
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
type routeProps = NativeStackNavigationProp<RootStackParamList>;
export function Setting() {
  const {isDark, t} = useValues();
  const {navigate} = useNavigation<routeProps>();
  const [showDeleteModal, setModalVisible] = useState(false);
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
        gotoScreen={() => navigate('AppSetting')}
        containerStyle={{
          paddingVertical: windowHeight(4),
        }}
      />
      <SettingInfo />
      <SettingList setModalVisible={setModalVisible} />
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
    </ScrollView>
  );
}
