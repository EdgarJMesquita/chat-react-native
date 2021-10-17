import { useContext } from "react";
import { ChatContext } from '../context/context';

export function useChat(){
  return useContext(ChatContext);
}