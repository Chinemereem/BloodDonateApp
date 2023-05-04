import React from 'react';
import Toast from 'react-native-root-toast';
import {Dimensions} from 'react-native';

const defaultConfig = {
  duration: Toast.durations.LONG,
  position: -50,
  shadow: false,
  animation: true,
  backgroundColor: 'pink',
  hideOnPress: true,
  opacity: 0.85,
  textStyle: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Roboto',
  },
  delay: 0,
  containerStyle: {
    width: Dimensions.get('window').width - 50,
    marginHorizontal: 16,
    borderRadius: 10,
  },
};

const displayToast = (message, status) => {
  if (!message) {
    throw new Error('Please input toast message');
  }
  switch (status) {
    case 'error':
      defaultConfig.backgroundColor = '#FF2156';
      break;
    case 'success':
      defaultConfig.backgroundColor = '#689593';
      break;
    case 'info':
      defaultConfig.backgroundColor = '#7C7C7C';
      break;
    default:
      defaultConfig.backgroundColor = '#979AA5';
  }
  const toast = Toast.show(message, defaultConfig);
  setTimeout(() => {
    Toast.hide(toast);
    clearTimeout(toast);
  }, 3000);
};

export default displayToast;
