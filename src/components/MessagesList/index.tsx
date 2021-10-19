import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native'
import { Message } from '../Message';
import { Socket } from 'socket.io-client';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

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

  async function saveAssetAndReturnURI(msg:MessageProps) {
    const base64 = msg.image?.base64 || '';
    const ext = msg.image?.ext || '';
    // Handling permissions
    const {status} = await MediaLibrary.getPermissionsAsync();
    status==='denied' && await MediaLibrary.requestPermissionsAsync();
    // Save asset to library
    const fileName = `${FileSystem.cacheDirectory+msg.id}.${ext}`;
    const encoding = FileSystem.EncodingType.Base64;
    await FileSystem.writeAsStringAsync(fileName, base64, { encoding });
    const { uri } = await MediaLibrary.createAssetAsync(fileName);
    return {
      id: msg.id,
      date: msg.date,
      sender: msg.sender,
      text: msg.text,
      uri
    }
  }

  useEffect(() => {
    (async()=>{
      if(!isFirstLoad) return;
      const storage = await AsyncStorage.getItem('@messages');
      const data:MessageProps[] = storage? JSON.parse(storage) : [];
      setMessages(data);
      setIsFirstLoad(true);
      console.log('firstLoad')
    })();
  }, []);

  useEffect(()=>{
    socket?.on('chat',async(msg:MessageProps)=>{
      const message = msg.image? await saveAssetAndReturnURI(msg) : msg;
      setMessages(prev=>[message,...prev]);
      const storage = await AsyncStorage.getItem('@messages');
      const data = storage? JSON.parse(storage) : [];
      const updatedMessages = JSON.stringify([message,...data]);
      AsyncStorage.setItem('@messages', updatedMessages);
    })
  },
  [socket]);
  /* useEffect(
    useCallback(() => {
      socket?.on('chat',async(msg:MessageProps)=>{
        const message = msg.image? await saveAssetAndReturnURI(msg) : msg;
        setMessages(prev=>[message,...prev]);

        const storage = await AsyncStorage.getItem('@messages');
        const data = storage? JSON.parse(storage) : [];
        const updatedMessages = JSON.stringify([message,...data]);
        AsyncStorage.setItem('@messages', updatedMessages);
      })
    },[socket]),
  [socket]); */

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