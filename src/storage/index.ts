import AsyncStorage from "@react-native-async-storage/async-storage";
import { MessageProps } from "../components/MessagesList";
import { ContactProps } from "../screens/Contacts";

type User = {
  username: string;
}

export async function fetchMessages(userId:string){
  const storage = await AsyncStorage.getItem(`@messages:${userId}`);
  const data:MessageProps[] = storage? JSON.parse(storage) : [];
  return data;
}

export async function saveOneMessage(msg:MessageProps){
  const storage = await AsyncStorage.getItem(`@messages:${msg.sender}`);
  const data = storage? JSON.parse(storage) : [];
  
  const updatedMessages = JSON.stringify([msg,...data]);
  AsyncStorage.setItem(`@messages:${msg.sender}`, updatedMessages);
  console.log(`Messages saved from: ${msg.sender}`);
}

export async function saveUserData(user:User){
  await AsyncStorage.setItem('@user', JSON.stringify(user));
}

export async function retrieveUserData(){
  const storage = await AsyncStorage.getItem('@user');
  const data = storage? JSON.parse(storage) : null;
  return data;
}

export async function saveContacts(contacts:ContactProps[]){
  await AsyncStorage.setItem('@contacts',JSON.stringify(contacts));
}

export async function retrieveContacts(){
  const storage = await AsyncStorage.getItem('@contacts');
  const contacts:ContactProps[] = storage? JSON.parse(storage) : [];
  return contacts;
}