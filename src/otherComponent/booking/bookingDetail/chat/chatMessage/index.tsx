import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { messageList } from '../data/data';
import ChatInput from '../chatInput';
import RenderItem from './renderItem';
import { useValues } from '../../../../../../App';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@src/store'
import { channelInterface } from '@src/store/redux/chat-messages-redux';
import { getChannelMessages } from '@src/services/chat.service';
import { datetimeArr } from '@src/config/utility';
import { chatMessagesActions } from '@src/store/redux/chat-messages-redux';
interface Message {
  sender: string;
  message: string;
  date: string;
}

interface Response {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}

export default function ChatView({ channelData }: { channelData: channelInterface }) {
  const [clickLoadMore, setClickLoadMore] = useState(false)
  const [messages, setMessages] = useState<Message[]>(messageList);
  const [newMessage, setNewMessage] = useState('');
  const { t } = useValues()
  const dispatch = useDispatch()
  const {
    channel_id,
    isFirstTimeLoading,
    isNoMoreData,
    offset,
    limit,
    dateMessages
  } = channelData

  //load chat messages
  const loadChatMessages = async (limitData:number,offsetData:number) => {
    try {
      const response: Response = await getChannelMessages(channel_id, limitData, offsetData);
      const messagesData = response?.data?.content?.data;
      if (messagesData && messagesData.length > 0) {
        const cloneDataMessages = [...dateMessages];
        messagesData.forEach((message: any) => {
          const { created_at } = message;
          const { day, month, year } = datetimeArr(created_at);
          const keyDate = `${day}_${month}_${year}`;
          const checkDateExist = cloneDataMessages.find(ele => ele.date === keyDate);
          if (checkDateExist) {
            checkDateExist.messages = [...checkDateExist.messages, message];
          } else {
            cloneDataMessages.push({
              date: keyDate,
              messages: [message]
            });
          }
        });
        const updatedChannelData = { ...channelData, isFirstTimeLoading: false, dateMessages: cloneDataMessages };
        dispatch(chatMessagesActions.updateData(updatedChannelData))
        
      } else {
        console.log("No new messages found.");
      }
    } catch (error) {
      console.error("Error loading chat messages:", error);
    }
    setClickLoadMore(false)
  };


  useEffect(()=>{
    if(isFirstTimeLoading || clickLoadMore){
      loadChatMessages(limit,offset)
    }else{
      // const intervalId = setInterval(() => {
      //   loadChatMessages(1,1)
      // }, 10000);
      // return () => clearInterval(intervalId);
    }
  },[isFirstTimeLoading,clickLoadMore])


  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([
        { sender: 'Sender', message: newMessage, date: '' },
        ...messages,
      ]);
      setNewMessage('');
    }
  };

  return (
    <View style={styles.container}>
      {isFirstTimeLoading && <ActivityIndicator />}
      {!isFirstTimeLoading &&
        <>
          <FlatList
            inverted
            showsVerticalScrollIndicator={false}
            data={dateMessages}
            keyExtractor={(item)=>item.date}
            renderItem={({ item }) => (
              <>
                <RenderItem item={item} />
              </>
            )}
            onEndReachedThreshold={0.1} // Trigger when 10% away from the end
            onEndReached={() => {
              setClickLoadMore(true)
              const updatedChannelData = { ...channelData, offset: offset + 1 };
              dispatch(chatMessagesActions.updateData(updatedChannelData))
            }}
          />
          <ChatInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
          />
        </>
      }
    </View>
  );
}
