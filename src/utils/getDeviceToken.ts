import * as Notifications from 'expo-notifications';
import { Platform, ToastAndroid } from 'react-native';

export async function getDeviceToken() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      ToastAndroid.show('Failed to get push token for push notification!', 3000);
      return;
    }

    const { data } = await Notifications.getDevicePushTokenAsync();
    console.log(data);
  
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return data;
  }