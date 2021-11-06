import React from 'react';
import { View, Text } from 'react-native';
import { ContactProps } from '../../screens/Contacts';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';

type HeaderProps = {
  goBack: ()=>void;
  contact: ContactProps;
}

export function Header({contact, goBack}:HeaderProps) {
  return(
    <View style={styles.header}>
      <BorderlessButton onPress={goBack}>
        <Feather name="arrow-left" size={25} color="#FFFFFF"/>
      </BorderlessButton>
      <Text style={styles.title}>
        {contact.userId}
      </Text>
    </View>
  );
}