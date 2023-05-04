import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Colors} from '../assets/fonts/util/commonStyle';
export const Loader = ({backgroundGradient, style}) => {
  return (
    <View
      style={[
        styles.loader,
        backgroundGradient && {backgroundColor: backgroundGradient},
        style,
      ]}>
      <Spinner />
    </View>
  );
};

const Spinner = ({size, style}) => {
  return (
    <View style={[style, styles.spinnerStyle]}>
      <ActivityIndicator size={size || 'large'} color={Colors.DarkBlue} />
    </View>
  );
};
const styles = StyleSheet.create({
  loader: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFFC',
    position: 'absolute',
    zIndex: 4,
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
