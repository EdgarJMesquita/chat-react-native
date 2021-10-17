import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  messageReceived: {
    backgroundColor: '#373747',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10
  },
  
  messageSended: {
    backgroundColor: '#00af9c',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10
  },

  dateReceivedMessage: {
    color: '#aaaaaa',
    fontSize: 11,
    paddingLeft: 3
  },

  dateSendedMessage: {
    color: '#00af9c',
    fontSize: 11,
    textAlign: 'right',
    paddingRight: 3
  },
  
  text: {
    color: '#F8F8F8',
    padding: 10
  },

  
});