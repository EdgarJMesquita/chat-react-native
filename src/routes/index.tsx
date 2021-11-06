import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Chat } from '../screens/Chat';
import { SignIn } from '../screens/SignIn';
import { useSocket } from '../hooks/useSocket';
import { ContactProps, Contacts } from '../screens/Contacts';

const { Navigator, Screen } = createNativeStackNavigator();

type RootStackParamsList = {
  Contacts: undefined;
  SignIn: undefined;
  Chat: { contact: ContactProps }
}

export type ScreenProps = NativeStackScreenProps<RootStackParamsList>;
export type ChatScreenProps = NativeStackScreenProps<RootStackParamsList,'Chat'>;

export function Routes(){
  const { user } = useSocket();

  return(
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#232635' }
        }}
      >
        {
          user?
          <>
            <Screen name="Contacts" component={Contacts}/>
            <Screen name="Chat" component={Chat}/>
          </>
          :
          <Screen name="SignIn" component={SignIn}/>
        }
      </Navigator>
    </NavigationContainer>
  );
}