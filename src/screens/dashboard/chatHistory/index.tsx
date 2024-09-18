import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyle} from '@style/styles';
import Header from '@commonComponents/header';
import {Delete, More} from '@utils/icons';
import {HistoryList} from './historyList';
import {historyOptions} from './data';
import CustomModal from '@otherComponent/customModal';
import Toast from 'react-native-toast-message';
import {styles} from './styles';
import ModalComponent from '@commonComponents/modal';
import appColors from '@theme/appColors';
import {useValues} from '../../../../App';

export function ChatHistory() {
  const [visible, setVisible] = useState(false);
  const [showDeleteModal, setModalVisible] = useState(false);
  const {isDark,t} = useValues();

  const getSelected = (val: number) => {
    val == 0 ? handleAlertMsg() : setModalVisible(true);
  };

  const handleAlertMsg = () => {
    Toast.show({
      type: 'tomatoToast',
    });
  };
  const successConfig = {
    tomatoToast: () => (
      <View style={styles.mainContainer}>
        <Text style={styles.text}>{t('common.refresh')}</Text>
      </View>
    ),
  };

  return (
    <View
      style={[
        GlobalStyle.mainView,
        {backgroundColor: isDark ? appColors.darkTheme : appColors.white},
      ]}>
      <Header
        showBackArrow={true}
        title={'chat.chatHistory'} 
      />
      <HistoryList />
      <Toast config={successConfig} />
      <CustomModal
        visible={visible}
        setVisible={setVisible}
        data={historyOptions}
        getSelected={getSelected}
      />
       
    </View>
  );
}
