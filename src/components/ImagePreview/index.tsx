import React, { useState } from 'react';
import { View, Image, ImageBackground, Pressable } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import RNModal from 'react-native-modal';
import { Entypo } from '@expo/vector-icons';
import { styles } from './styles';

type Props = {
  uri?: string;
  base64?: string;
  ext?: string;
}

export function ImagePreview({uri,base64, ext}:Props) {
  const [isOpen, setIsOpen] = useState(false);

  return(
    <Pressable onPress={()=>setIsOpen(true)}>
      <Image source={{uri}} resizeMode="contain" style={styles.image}/>
      <RNModal
        isVisible={isOpen}
        style={{margin: 0}}
        animationIn="zoomIn"
        animationOut="fadeOut"
        useNativeDriver
      >
        <Pressable onPress={()=>setIsOpen(false)} style={{flex: 1, width: '100%'}}>
          <ImageBackground
            source={{uri}}
            style={{flex: 1, width: '100%'}}
            resizeMode="contain"
          >
            <Entypo name="chevron-left" color="#FFFFFF" size={27} />
          </ImageBackground>
        </Pressable>
      </RNModal>
    </Pressable>
  );
}