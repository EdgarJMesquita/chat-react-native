import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native'
import { Message } from '../Message';
import { Socket } from 'socket.io-client';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveAssetAndReturnURI } from '../../utils/saveAssetAndReturnURI';
import { fetchMessages, saveOneMessage } from '../../storage';

export type MessageProps = {
  id: string;
  text: string;
  sender: string;
  date: string;
  uri:string;
  image?: {
    base64: string;
    ext: string;
  }
}

type Props = {
  socket: Socket | undefined;
}

export function MessagesList({socket}:Props) {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState(false);

  //AsyncStorage.removeItem('@messages');

 

  useEffect(() => {
    (async()=>{
      if(isFirstLoad) return;
      setMessages(await fetchMessages());
      setIsFirstLoad(true);
    })();
  }, []);

  useEffect(()=>{
    socket?.on('chat',async(msg:MessageProps)=>{

      const message = msg.image? await saveAssetAndReturnURI(msg) : msg;
      setMessages(prev=>[message,...prev]);
      saveOneMessage(message);
      
    })
  },
  [socket]);

  return(
    <FlatList 
      data={messages}
      inverted
      keyExtractor={item=>item.id}
      style={styles.flatList}
      renderItem={({item})=> <Message message={item}/> }
    />
  );
}