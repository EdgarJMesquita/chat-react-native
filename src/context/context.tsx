import React from 'react';
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { io ,Socket } from 'socket.io-client';
import { User } from '../../App';
import { MessageProps } from '../components/MessagesList';
import { saveOneMessage } from '../storage';
import { saveAssetAndReturnURI } from '../utils/saveAssetAndReturnURI';


type ContextType = {
  socket: Socket | undefined;
  user: User | undefined;
  setUser: (user:User)=>void;
  newMessage: MessageProps | undefined;
}

type ProviderType = {
  children: ReactNode;
  userData: User | undefined;
}

const SocketContext = createContext({} as ContextType);

function ContextProvider({userData, children}:ProviderType){
  const [ socket, setSocket ] = useState<Socket>();
  const [ user, setUser ] = useState<User|undefined>(userData);
  const [ newMessage, setNewMessage ] = useState<MessageProps>();

  useEffect(() => {
    if(!user) return;
    const production = 'ws://api-chatx.herokuapp.com';
    const dev = 'ws://192.168.0.107';

    setSocket(io(dev,{ query: {userId: user.username} }));
  }, [user]);

  useEffect(()=>{
    socket?.on(`private`,async(msg:MessageProps)=>{
      const message = msg.image? await saveAssetAndReturnURI(msg) : msg;
      await saveOneMessage(message);
      setNewMessage(message);
    });
  },[socket]);

  return(
    <SocketContext.Provider value={{
      user,
      socket,
      setUser,
      newMessage
    }}>
      {children}
    </SocketContext.Provider>
    
  )
}

export { 
  SocketContext,
  ContextProvider
}