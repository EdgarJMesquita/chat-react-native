import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Socket } from 'socket.io-client';
import { ScreenProps } from '../../routes';
import { ContactProps } from '../../screens/Contacts';
import { saveOneMessage } from '../../storage';
import { saveAssetAndReturnURI } from '../../utils/saveAssetAndReturnURI';
import { MessageProps } from '../MessagesList';
import { styles } from './styles';


type ContactCardProps = ScreenProps & {
  contact: ContactProps;
  socket?: Socket;
}

export function ContactCard({socket, contact,navigation}:ContactCardProps) {
  const [isMounted, setIsMounted] = useState(true);
  const [ newMessages, setNewMessages ] = useState<MessageProps[]>([]);

  /* useEffect(()=>{
    if(!isMounted) return;
    
    socket?.on(`private`,async(msg:MessageProps)=>{
      console.log(msg);
      const message = msg.image? await saveAssetAndReturnURI(msg) : msg;
      setNewMessages(prev=>[message,...prev]);
      saveOneMessage(message, contact.userId);
    });
    return ()=>{
      setIsMounted(false);
    }
  },
  [socket]); */

  return(
    <RectButton 
      onPress={()=>navigation.navigate('Chat', {contact})}
      style={styles.card}
    >
      <Text style={styles.title}>
        {contact.userId}
      </Text>
      <Text>{newMessages.length}</Text>
    </RectButton>
  );
}