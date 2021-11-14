import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ContextProvider } from './src/context/context';
import { Routes } from './src/routes';
import AppLoading from 'expo-app-loading';
import { retrieveUserData } from './src/storage';
import { Background } from './src/components/Background';
import { useFonts } from 'expo-font';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import { getDeviceToken } from './src/utils/getDeviceToken';

export type MessageProps = {
  id: string;
  text: string;
  sender: string;
}

export type User = {
  username: string;
  id?: string;
}

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [userData, setUserData] = useState<User>();

  let [ isFontLoaded ] = useFonts({
    Inter_400Regular
  });

  useEffect(() => {
    (async()=>{
      setUserData(await retrieveUserData());
      setIsReady(true);
    })();
  }, []);

  //getDeviceToken().then(res=>console.log(res)).catch(err=>console.log(err));

  if(!isReady || !isFontLoaded){
    return <AppLoading />
  }
  
  return (
    <Background>
      <ContextProvider userData={userData}>
        <StatusBar style="light" translucent/>
        <Routes />
      </ContextProvider>
    </Background>
  );
}
