import { useFocusEffect, useIsFocused } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { ContactCard } from '../../components/ContactCard';
import { MessageProps } from '../../components/MessagesList';
import { useSocket } from '../../hooks/useSocket';
import { ScreenProps } from '../../routes';
import { retrieveContacts, saveContacts, saveOneMessage } from '../../storage';
import { saveAssetAndReturnURI } from '../../utils/saveAssetAndReturnURI';
import { styles } from './styles';

export type ContactProps = {
  userId: string;
  id: string;
}

export function Contacts({...rest}:ScreenProps) {
  const [ isMounted, setIsMounted ] = useState(true);
  const { user, socket } = useSocket();
  const [users, setUsers] = useState<ContactProps[]|null>(null);

  useEffect(() => {
    (async()=>{
      socket?.on('active users', (users:ContactProps[])=>{
        const filtered = users.filter(contacts=>contacts.userId !==user?.username);
        setUsers(filtered);
        saveContacts(filtered);
      });
    })();
  }, [socket]);

  useEffect(()=>{
    if(!isMounted) return;
    (async()=>{
      setUsers(await retrieveContacts());
    })();
    return ()=>{
      setIsMounted(false);
    }
  },[]);

  /* useEffect(()=>{
    if(!isMounted) return;
    socket?.on(`private`,async(msg:MessageProps)=>{
      const message = msg.image? await saveAssetAndReturnURI(msg) : msg;
      console.log('rendered');
      saveOneMessage(message);
    });

    return ()=>{
      setIsMounted(false);
    }
  },[socket]); */

  return(
    <View style={styles.container}>
      <FlatList 
        data={users}
        keyExtractor={(i,index)=>String(index)}
        contentContainerStyle={{paddingHorizontal: 30, paddingTop: 50}}
        renderItem={({item})=><ContactCard socket={socket} {...rest} contact={item}/>}
      />
    </View>
  );
}