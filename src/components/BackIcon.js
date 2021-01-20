import React from 'react';
import {Image} from 'react-native';

export default function BackIcon({style}) {
  return (
    <Image
      {...style}
      width={24}
      height={24}
      source={require('../assets/images/back.png')}
    />
  );
}
