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
import { sendMessageInChannel } from '@src/services/chat.service';
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

  console.log(channel_id)

  //load chat messages
  const loadChatMessages = async (limitData:number,offsetData:number  ) => {
    try {
      const response: Response = await getChannelMessages(channel_id, limitData, offsetData);
      const messagesData = response?.data?.content?.data;
      if (messagesData && messagesData.length > 0) {
        let cloneDataMessages = [...dateMessages];
        messagesData.forEach((message: any) => {
          const { created_at } = message;
          const { day, month, year } = datetimeArr(created_at);
          const keyDate = `${day}_${month}_${year}`;
          const dateIndex = cloneDataMessages.findIndex(ele => ele.date === keyDate);
          if (dateIndex !== -1) {
            console.log("============== existing ==============")
            console.log(message)
            const updatedMessages =   [...cloneDataMessages[dateIndex].messages, message];
            const sortedData = updatedMessages.sort((a, b) => {
              return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            });
            cloneDataMessages[dateIndex] = {
              ...cloneDataMessages[dateIndex],
              messages: sortedData,
            };
          } else {
            console.log("================== new ==============")
            // console.log(message.message)
            cloneDataMessages.push({
              date: keyDate,
              mainDate:created_at,
              messages: [message]
            });

          }
        });
        cloneDataMessages = cloneDataMessages.sort((a, b) => {
          return new Date(b.mainDate).getTime() - new Date(a.mainDate).getTime();
        });
        console.log(JSON.stringify(cloneDataMessages,null,2))
        const updatedChannelData = { ...channelData, isFirstTimeLoading: false, isNoMoreData:!response?.data?.content?.next_page_url, dateMessages: cloneDataMessages };
        dispatch(chatMessagesActions.updateData(updatedChannelData))
        
      } else {
        const updatedChannelData = { ...channelData,isNoMoreData:true };
        dispatch(chatMessagesActions.updateData(updatedChannelData))
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
      // }, 1000);
      // return () => clearInterval(intervalId);
    }
  },[isFirstTimeLoading,clickLoadMore])


  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
        const formData = new FormData()
        formData.append('message',newMessage)
        formData.append('channel_id',channel_id)
        const response:Response = await sendMessageInChannel(formData)
        loadChatMessages(1,1)
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
                <RenderItem key={'render-'+item.date} item={item} />
              </>
            )}
            onEndReachedThreshold={0.1} // Trigger when 10% away from the end
            onEndReached={() => {
              if(isNoMoreData){ return } 
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
