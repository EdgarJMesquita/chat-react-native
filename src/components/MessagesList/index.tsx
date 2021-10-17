import React, { useCallback, useEffect, useState, InputHTMLAttributes } from 'react';
import { Text } from 'react-native'
import { FlatList, RectButton } from 'react-native-gesture-handler';
import { Message } from '../Message';
import { Socket } from 'socket.io-client';
import { styles } from './styles';
import { api } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


export type MessageProps = {
  id: string;
  text: string;
  sender: string;
  date: string;
  type?: string;
  url?: string;
}

type Props = {
  socket: Socket | undefined;
}

type RequestResponseProp = {
  data: MessageProps[];
}



export function MessagesList({socket}:Props) {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState(false);

  useEffect(() => {
    // Retrieving messages from AsyncStorage
    (async()=>{
      const storage = await AsyncStorage.getItem('@messages');
      const data:MessageProps[] = storage? JSON.parse(storage) : [];
      setMessages(data);
      setIsFirstLoad(true);
      console.log('retrieving');
    })();
  }, []);

  useEffect(() => {
    // saving to AsyncStorage
    if(!isFirstLoad) return;
    (async()=>{
      const _messages = JSON.stringify(messages);
      await AsyncStorage.setItem('@messages', _messages);
      console.log('saving');
    })();
  }, [messages])

  useEffect(
    useCallback(() => {
      socket?.on('chat',(msg:MessageProps)=>{
        setMessages(prev=>[msg,...prev])
        const _messages = JSON.stringify(messages);
        AsyncStorage.setItem('@messages', _messages);
      })
    },[socket]),
  [socket]);

  async function clearStorage() {
    await AsyncStorage.removeItem('@messages');
    setMessages([]);
    console.log('hey');
  }

  /* if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  } */

  /* // Retrieving from DB 
  const fetcher = (url:string) => api(url).then(({data})=>data);
  useEffect(() => {
    if(!data) return;
    setMessages(data.reverse());
  }, [data]) */

  return(
    <>
      <FlatList 
        data={messages}
        inverted
        keyExtractor={item=>item.id}
        style={styles.flatList}
        renderItem={({item})=> <Message message={item}/> }
      />
      <RectButton onPress={clearStorage}>
        <Text>Remove</Text>
      </RectButton>
    </>
  );
}