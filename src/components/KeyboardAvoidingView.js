import React from 'react';
import {View, KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';

export const KeyboardAvoidingContainer = ({
  children,
  style,
  headerAvailable = true,
}) => {
  const height = Platform.OS === 'ios' ? 5 : -390;
  return (
    <SafeAreaView style={{flex: 1,  backgroundColor: '#E5E5E5'}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={height}>
        <View
          style={[
            {
              backgroundColor: 'white',
            },
            style,
          ]}>
          {children}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default KeyboardAvoidingContainer;
