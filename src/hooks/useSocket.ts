import { useContext } from "react";
import { SocketContext } from '../context/context';

export function useSocket(){
  return useContext(SocketContext);
}