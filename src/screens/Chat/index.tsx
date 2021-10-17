import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { MessagesList } from '../../components/MessagesList';
import { Input } from '../../components/Input';
import { useChat } from '../../hooks/useChat';

export function Chat() {
  const { socket } = useChat(); 
  return (
    <View style={styles.chat}>
      <MessagesList socket={socket}/>
      <Input socket={socket}/>
    </View>
  );
}