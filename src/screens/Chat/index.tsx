import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { MessagesList } from '../../components/MessagesList';
import { Input } from '../../components/Input';
import { useSocket } from '../../hooks/useSocket';
import { Header } from '../../components/Header';
import { ChatScreenProps } from '../../routes';

export function Chat({route ,navigation}:ChatScreenProps) {
  const { socket } = useSocket();
  const contact = route.params.contact;

  return (
    <View style={styles.chat}>
      <Header contact={contact} goBack={()=>navigation.goBack()}/>
      <MessagesList contact={contact} socket={socket} isFocused={navigation.isFocused()}/>
      <Input contact={contact} socket={socket}/>
    </View>
  );
}