import {ScrollView, View, Text} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyle} from '@style/styles';
import Header from '@commonComponents/header';
import {windowHeight} from '@theme/appConstant';
import Profile from './profile';
import Info from './info';
import Language from './language';
import Expertise from './expertise';
import {styles} from './styles';
import {Delete} from '@utils/icons';
import appColors from '@theme/appColors';
import ModalComponent from '@commonComponents/modal';
import {useValues} from '../../../../../../App';
export function ServiceMenDetail() {
  const [showDeleteModal, setModalVisible] = useState(false);
  const {t, isDark} = useValues();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        GlobalStyle.mainView,
        {backgroundColor: isDark ? appColors.darkTheme : appColors.white},
      ]}
      contentContainerStyle={{paddingBottom: windowHeight(3)}}>
      <Header
        showBackArrow={true}
        title="serviceManDetails.servicemenDetails"
        trailIcon={<Delete color={appColors.error} />}
        circleStyle={{backgroundColor: appColors.lightRed}}
        gotoScreen={() => setModalVisible(true)}
      />
      <Profile />
      <Info />
      <View style={[GlobalStyle.horizontalLine, styles.horizontalLine]}></View>
      <View style={styles.container}>
        <Text
          style={[
            styles.heading,
            {color: isDark ? appColors.white : appColors.darkText},
          ]}>
          {t('providerDetail.knownLanguage')} :
        </Text>
        <View style={styles.row}>
          <Language title={'providerDetail.english'} />
          <Language title={'providerDetail.chinese'} />
          <Language title={'providerDetail.spanish'} />
        </View>
      </View>
      <View>
        <View style={styles.expertise}>
          <Text
            style={[
              styles.heading,
              {color: isDark ? appColors.white : appColors.darkText},
            ]}>
            {t('serviceManDetails.expertise')} :
          </Text>
          <View style={styles.row}>
            <Expertise title={'home.cleaning'} />
            <Expertise title={'home.painting'} />
            <Expertise title={'home.carpenter'} />
          </View>
        </View>
      </View>
      <ModalComponent
        icon={<Delete color={appColors.error} height={'60'} width={'60'} />}
        visible={showDeleteModal}
        onClose={() => setModalVisible(false)}
        success={false}
        title="servicemen.deleteServiceMen"
        content="servicemen.deleteServiceMenContent"
        btnTitle="profileSetting.delete"
        gotoScreen={() => setModalVisible(false)}
        showText={t('wallet.cancel')}
        onShowText={() => setModalVisible(false)}
      />
    </ScrollView>
  );
}
