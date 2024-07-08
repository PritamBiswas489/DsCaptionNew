import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {GlobalStyle} from '@style/styles';
import Header from '@commonComponents/header';
import {styles} from './styles';
import NotificationList from './notificationList';
import {CheckList, Delete} from '@utils/icons';
import {useValues} from '../../../App';
import appColors from '@theme/appColors';
import ModalComponent from '@commonComponents/modal';

export function Notification() {
  const {isDark,t} = useValues();
  const [showDeleteModal, setModalVisible] = useState(false);
  return (
    <View
      style={[
        GlobalStyle.mainView,
        {backgroundColor: isDark ? appColors.darkCardBg : appColors.white},
      ]}>
      <Header
        title={'notificationArr.title'}
        trailIcon={
          <CheckList color={isDark ? appColors.white : appColors.darkText} />
        }
        trailIcon1={<Delete color={appColors.error} />}
        onTrailIcon={() => setModalVisible(true)}
        showBackArrow={true}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={GlobalStyle.contentContainerStyle}
        contentContainerStyle={GlobalStyle.contentContainerStyle}>
        <View style={styles.marginTop}></View>
        <View
          style={[
            styles.container,
            {
              backgroundColor: isDark ? appColors.darkTheme : appColors.boxBg,
              borderColor: isDark ? appColors.darkBorder : appColors.border,
            },
          ]}>
          <NotificationList />
        </View>
      </ScrollView>
      <ModalComponent
        icon={<Delete color={appColors.error} height={'60'} width={'60'} />}
        visible={showDeleteModal}
        onClose={() => setModalVisible(false)}
        success={false}
        title="notificationArr.deleteNotification"
        content="notificationArr.deleteConfirmation"
        btnTitle="profileSetting.delete"
        gotoScreen={() => setModalVisible(false)}
        showText={t('wallet.cancel')}
        onShowText={() => setModalVisible(false)}
      />
    </View>
  );
}
