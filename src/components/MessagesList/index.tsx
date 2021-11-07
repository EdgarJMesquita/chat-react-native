import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native'
import { MessageCard } from '../MessageCard';
import { Socket } from 'socket.io-client';
import { styles } from './styles';
import { saveAssetAndReturnURI } from '../../utils/saveAssetAndReturnURI';
import { fetchMessages, saveOneMessage } from '../../storage';
import { ContactProps } from '../../screens/Contacts';
import { useSocket } from '../../hooks/useSocket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useIsFocused } from '@react-navigation/core';

export type MessageProps = {
  id: string;
  text: string;
  sender: string;
  date: string;
  uri:string;
  receiver: string;
  image?: {
    base64: string;
    ext: string;
  }
}

type Props = {
  socket: Socket | undefined;
  contact: ContactProps;
  isFocused: boolean;
}

export function MessagesList({contact, socket, isFocused}:Props) {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const { newMessage } = useSocket();

  useEffect(() => {
    (async()=>{
      setMessages(await fetchMessages(contact.userId));
    })();
  }, [newMessage]);

  /* useEffect(()=>{
    if(!isMounted) return;
    socket?.on(`private`,async(msg:MessageProps)=>{
      console.log(msg);
      const message = msg.image? await saveAssetAndReturnURI(msg):msg;
      saveOneMessage(message);

      if(msg.sender === contact.userId){
        isMounted && setMessages(prev=>[message,...prev]);
      }
    });

    return ()=>{
      setIsMounted(false);
    }
  },[socket]); */

  return(
    <FlatList 
      data={messages}
      inverted
      keyExtractor={item=>item.id}
      style={styles.flatList}
      contentContainerStyle={{paddingHorizontal: 15}}
      renderItem={({item})=> <MessageCard message={item}/> }
    />
  );
}