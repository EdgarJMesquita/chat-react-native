import React, { useState } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { BorderlessButton, TouchableOpacity } from 'react-native-gesture-handler';
import SendSvg from '../../assets/send.svg';
import ClipSvg from '../../assets/clip.svg';
import { styles } from './styles';
import { Socket } from 'socket.io-client';
import * as ImagePicker from 'expo-image-picker';
import { api } from '../../services/api';
 
type Props = {
  socket: Socket | undefined;
}
type ResponseProps = {
  data: {
    imageURL: string;
  }
}

export function Input({socket}:Props) {
  const [newMessage, setNewMessage] = useState('');

  function sendMessage(){
    if(!newMessage) return;
    const _newMessage = {
      text: newMessage.trim(),
      sender: 'Mobile'
    }
    setNewMessage('');
    socket?.emit('chat', _newMessage);
  }

  async function sendFile(){
    const response = await ImagePicker.launchImageLibraryAsync({
      base64: true
    });
    if(response.cancelled) return;

    const uris = response.uri.split('.');
    const ext = uris[uris.length-1];

    const picture = {
      image: {
        base64: response.base64,
        ext,
      },
      sender: 'Edgar',
      text: ''
    };
    socket?.emit('chat', picture);
  }

  return(
    <View style={styles.input}>
      <TextInput
        multiline
        style={{flex: 1,height: 50, color: '#FFFFFF'}}
        placeholderTextColor={'#F8F8F8'}
        onChangeText={setNewMessage}
        value={newMessage}
        placeholder="Type a message..."
      />
      <Pressable onPress={sendFile} >
        <BorderlessButton style={styles.button}>
          <ClipSvg width={27} height={27}/>
        </BorderlessButton>
      </Pressable>
      <Pressable onPress={sendMessage} >
        <BorderlessButton style={styles.button}>
          <SendSvg width={27} height={27}/>
        </BorderlessButton>
      </Pressable>
    </View>
  );
}