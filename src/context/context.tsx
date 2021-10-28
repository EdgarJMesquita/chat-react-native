import React from 'react';
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { io ,Socket } from 'socket.io-client';


type ContextType = {
  socket: Socket | undefined;
}

type ProviderType = {
  children: ReactNode;
}

const ChatContext = createContext({} as ContextType);

function ContextProvider({children}:ProviderType){
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const production = 'ws://api-chatx.herokuapp.com';
    const dev = 'ws://192.168.0.103';

    const newSocket = io(production,{ query: { username: 'Edgar' } });
    setSocket(newSocket);
  }, [])

  return(
    <ChatContext.Provider value={{
      socket
    }}>
      {children}
    </ChatContext.Provider>
    
  )
}

export { 
  ChatContext,
  ContextProvider
}