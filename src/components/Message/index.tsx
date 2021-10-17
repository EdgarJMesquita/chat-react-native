import { format } from 'date-fns';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { ImagePreview } from '../ImagePreview';
import { MessageProps } from '../MessagesList';
import { styles } from './styles';

type Props = {
  message: MessageProps;
}

export function Message({message}:Props) {
  const isSender = message.sender === 'Mobile';

  if(message.type==='image' && message.url){
    <View>
      
    </View>
  }

  return(
    <View style={{marginBottom: 5, alignSelf: isSender? 'flex-end': 'flex-start'}}>
      <View style={isSender? styles.messageSended:styles.messageReceived}>
        {
          message.type === 'image' && 
          message.url && 
          <ImagePreview uri={message.url} />
        }
        {
          message.text? 
          <Text style={styles.text}>
            {message.text}
          </Text>
          : null
        }
      </View>
      <Text style={isSender? styles.dateSendedMessage: styles.dateReceivedMessage}>
        {format(new Date(message.date),'kk:mm')}
      </Text>
    </View>
  );
}