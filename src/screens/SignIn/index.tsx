import React, { useState } from 'react';
import { TextInput, View, Text } from 'react-native';
import * as Contacts from 'expo-contacts';
import { styles } from './styles';
import { RectButton } from 'react-native-gesture-handler';
import { saveUserData } from '../../storage';
import { useSocket } from '../../hooks/useSocket';

export function SignIn() {
  const [ username, setUsername ] = useState('');
  const { setUser } = useSocket();

  async function saveUser() {
    await saveUserData({username});
    setUser({username});
  }
  /* useEffect(() => {
    (async () => {
      try {
        //const data = await Contacts.getPermissionsAsync();
        console.log(await Contacts.getPermissionsAsync());
        
      } catch (err) {
        console.log(err)
      }
    })();
  }, []); */

  return(
    <View style={styles.container}>
      <Text style={styles.title}>
        Aplicativo Ordinário
      </Text>
      <TextInput
        onChangeText={setUsername}
        style={styles.input}
        placeholder="Digite seu nome..."
        placeholderTextColor="#AAAAAA"
      />
      <RectButton 
        onPress={saveUser}
        style={styles.button}
      >
        <Text style={styles.buttonTitle}>
          Entrar
        </Text>
      </RectButton>
    </View>
  );
}