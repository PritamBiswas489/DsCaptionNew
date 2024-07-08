import {View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyle} from '@style/styles';
import Header from '@commonComponents/header';
import UserProfile from './userProfile';
import InputView from './inputView';
import CommonModal from '@commonComponents/commonModal';
import ProfileImageOptions from './profileImageOptions';
import ModalComponent from '@commonComponents/modal';
import {useValues} from '../../../../../App';
import appColors from '@theme/appColors';

export function UserProfileSetting() {
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handleModal = () => {
    setShowModal(!showModal);
  };
  const {isDark} = useValues();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        GlobalStyle.mainView,
        {backgroundColor: isDark ? appColors.darkCard : appColors.white},
      ]}>
      <Header showBackArrow={true} title="profileSetting.setting" />
      <UserProfile setShowModal={setShowModal} />
      <View
        style={[
          GlobalStyle.horizontalLine,
          {
            marginTop: 0,
            borderWidth: 0.3,
            marginHorizontal: 20,
            height: 0.2,
            marginBottom: 2,
            borderColor: isDark ? appColors.darkBorder : appColors.border,
          },
        ]}
      />
      <InputView setModalVisible={setModalVisible} />
      <ModalComponent
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        success={true}
        title="auth.successTitle"
        content="auth.profileUpdate"
        btnTitle="common.okay"
        gotoScreen={() => setModalVisible(false)}
      />
      <CommonModal
        modal={<ProfileImageOptions setShowModal={setShowModal} />}
        showModal={showModal}
        visibleModal={handleModal}
      />
    </ScrollView>
  );
}
