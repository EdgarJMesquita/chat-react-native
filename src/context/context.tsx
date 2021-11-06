import React from 'react';
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { io ,Socket } from 'socket.io-client';
import { User } from '../../App';


type ContextType = {
  socket: Socket | undefined;
  user: User | undefined;
  setUser: (user:User)=>void;
}

type ProviderType = {
  children: ReactNode;
  userData: User | undefined;
}

const SocketContext = createContext({} as ContextType);

function ContextProvider({userData, children}:ProviderType){
  const [ socket, setSocket ] = useState<Socket>();
  const [ user, setUser ] = useState<User|undefined>(userData);

  useEffect(() => {
    if(!user) return;
    const production = 'ws://api-chatx.herokuapp.com';
    const dev = 'ws://192.168.0.107';

    setSocket(io(dev,{ query: { userId: user.username } }));
  }, [user]);

  return(
    <SocketContext.Provider value={{
      user,
      socket,
      setUser
    }}>
      {children}
    </SocketContext.Provider>
    
  )
}

export { 
  SocketContext,
  ContextProvider
}