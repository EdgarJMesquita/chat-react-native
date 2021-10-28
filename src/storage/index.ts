import AsyncStorage from "@react-native-async-storage/async-storage";
import { MessageProps } from "../components/MessagesList";

export async function fetchMessages(){
  const storage = await AsyncStorage.getItem('@messages');
  const data:MessageProps[] = storage? JSON.parse(storage) : [];

  return data;
}

export async function saveOneMessage(msg:MessageProps) {
  const storage = await AsyncStorage.getItem('@messages');
  const data = storage? JSON.parse(storage) : [];
  
  const updatedMessages = JSON.stringify([msg,...data]);
  AsyncStorage.setItem('@messages', updatedMessages);
}