import {View, Text, KeyboardAvoidingView} from 'react-native';
import React, {useState} from 'react';
import {GlobalStyle} from '@style/styles';
import Header from '@commonComponents/header';
import {More} from '@utils/icons';
import {styles} from './styles';
import CustomModal from '@otherComponent/customModal';
import {chatOptions} from './data/data';
import ChatMessage from './chatMessage';
import {useValues} from '../../../../../App';
import appColors from '@theme/appColors';

export function Chat() {
  const [visible, setVisible] = useState(false);
  const getSelected = (val: number) => {
    console.log(val);
  };
  const {isDark,t} = useValues();
  return (
    <View
      style={[
        GlobalStyle.mainView,
        {backgroundColor: isDark ? appColors.darkTheme : appColors.white},
      ]}>
      <View
        style={[
          styles.mainContainer,
          {backgroundColor: isDark ? appColors.darkTheme : appColors.white},
        ]}>
        <KeyboardAvoidingView
          style={[
            styles.innerContainer,
            {backgroundColor: isDark ? appColors.darkTheme : appColors.white},
          ]}>
          <Header
            showBackArrow={true}
            title="booking.serviceMan1"
            trailIcon={
              <More color={isDark ? appColors.white : appColors.darkText} />
            }
            gotoScreen={() => {
              setVisible(true);
            }}
            content={
              <View style={styles.container}>
                <Text style={styles.textStyle}>{t('chat.online')}</Text>
              </View>
            }
          />
          <View style={styles.mainView}>
            <ChatMessage />
          </View>
          <CustomModal
            visible={visible}
            setVisible={setVisible}
            data={chatOptions}
            getSelected={getSelected}
          />
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
