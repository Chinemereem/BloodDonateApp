import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {hp} from '../utils';

export const RedText = ({title, children, style}) => {
  return (
    <Text
      style={[
        {
          color: '#FF2156',
          fontFamily: 'Poppins',
        },
        style,
      ]}>
      {title}
      {children}
    </Text>
  );
};

export const TextWithOnpress = ({title, children, onpress, style}) => {
  return (
    <TouchableOpacity onPress={onpress}>
      <Text
        style={[
          {
            fontSize: hp(18),
            fontFamily: 'Poppins',
          },
          style,
        ]}>
        {title}
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export const RegularText = ({title, children, style}) => {
  return (
    <Text
      style={[
        {
          color: '#000',
          fontFamily: 'Poppins',
        },
        style,
      ]}>
      {title}
      {children}
    </Text>
  );
};
