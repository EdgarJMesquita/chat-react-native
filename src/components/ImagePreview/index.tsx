import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Pressable } from 'react-native';
import RNModal from 'react-native-modal';
import { Entypo } from '@expo/vector-icons';
import { styles } from './styles';

type Props = {
  uri?: string;
}

let image:Image | null;

export function ImagePreview({uri}:Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  

  useEffect(() => {
    if(!uri) return;
    Image.getSize(uri, (width,height)=>{
      const calculatedHeight = height * (200/width);
      setHeight(calculatedHeight)
    });
  }, [uri]);

  return(
    <Pressable onPress={()=>setIsOpen(true)}>
      <Image ref={(e)=>image=e} source={{uri}} style={[styles.image, { height }]} resizeMode="contain" />
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