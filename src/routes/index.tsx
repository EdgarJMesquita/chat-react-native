import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Chat } from '../screens/Chat';
const { Navigator, Screen } = createNativeStackNavigator();

export function Routes(){
  return(
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right'
        }}
      >
        <Screen name="Chat" component={Chat}/>
      </Navigator>
    </NavigationContainer>
  );
}