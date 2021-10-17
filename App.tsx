import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ContextProvider } from './src/context/context';
import { Routes } from './src/routes';

export type MessageProps = {
  id: string;
  text: string;
  sender: string;
}

export default function App() {
  return (
    <ContextProvider>
      <StatusBar style="light" translucent/>
      <Routes />
    </ContextProvider>
  );
}
