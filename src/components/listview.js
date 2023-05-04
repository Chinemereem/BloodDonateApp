import React from 'react';
import {View, TouchableOpacity, ViewStyle, StyleProp} from 'react-native';

export const HStack = ({
  align = 'center',
  justify = 'flex-start',
  style,
  children,
  onPress,
  testID,
}) => {
  const Wrapper =
    onPress && typeof onPress === 'function' ? TouchableOpacity : View;
  return (
    <Wrapper
      testID={testID}
      onPress={onPress}
      activeOpacity={0.5}
      style={[
        {
          flexDirection: 'row',
          alignItems: align,
          justifyContent: justify,
        },
        style,
      ]}>
      {children}
    </Wrapper>
  );
};
