import {View, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {Emoji, Send, Microphone,Attachment, ImageIcon} from '@utils/icons';
import {styles} from './styles';
import appColors from '@theme/appColors';
import {useValues} from '../../../../../../App';

export default function ChatInput({
  newMessage,
  setNewMessage,
  handleSendMessage,
}: {
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
}) {
  const {isDark,t} = useValues();
  return (
    <View
      style={[
        styles.inputContainer,
        {backgroundColor: isDark ? appColors.darkCard : appColors.boxBg},
      ]}>
      <TextInput
        style={[
          styles.input,
          {backgroundColor: isDark ? appColors.darkCard : appColors.boxBg},
          {color: isDark ? appColors.white : appColors.darkText,}
        ]}
        placeholderTextColor={appColors.lightText}
        placeholder={t('chat.typeHere')}
        value={newMessage}
        onChangeText={setNewMessage}
      />
      <TouchableOpacity style={{marginRight:10}}  activeOpacity={0.9}>
        <ImageIcon />
      </TouchableOpacity>
      <TouchableOpacity style={{marginRight:2}} activeOpacity={0.9}>
        <Attachment />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSendMessage}
        style={styles.buttonView}
        activeOpacity={0.9}>
        <Send />
      </TouchableOpacity>
    </View>
  );
}
