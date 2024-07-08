import React, {useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import {styles} from './styles';
import {messageList} from '../data/data';
import ChatInput from '../chatInput';
import RenderItem from './renderItem';
import { useValues } from '../../../../../../App';

interface Message {
  sender: string;
  message: string;
  date: string;
}

export default function ChatView() {
  const [messages, setMessages] = useState<Message[]>(messageList);
  const [newMessage, setNewMessage] = useState('');
  const {t} = useValues()

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([
        {sender: 'Sender', message: newMessage, date: ''},
        ...messages,
      ]);
      setNewMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListFooterComponent={() => (
          <View style={styles.timeView}>
            <Text style={styles.time}>{t('chat.todayTime')}</Text>
          </View>
        )}
        inverted
        showsVerticalScrollIndicator={false}
        data={messages}
        renderItem={({item}) => (
          <>
            <RenderItem item={item} />
          </>
        )}
      />
      <ChatInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
      />
    </View>
  );
}
