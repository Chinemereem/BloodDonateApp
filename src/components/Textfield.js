import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {hp, wp} from '../utils';
import Colors from './Colors';
import {HStack} from './listview';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import {EyeClosed, EyeOpened} from '../assets/Svg';
export const TextField = ({
  value,
  onChangeText,
  placeholder,
  style,
  icon,

  inputStyle,
  editable = true,
  secureTextEntry,
  isPassword,
  handleClickShowPassword,
  showPassword,
}) => {
  return (
    <SafeAreaView>
      <HStack style={[styles.stackStyle, style]}>
        {icon}
        <TextInput
          style={[styles.input, inputStyle]}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          editable={editable}
          placeholderTextColor="gray"
          secureTextEntry={secureTextEntry}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={handleClickShowPassword}
            style={styles.icon}>
            {showPassword ? <EyeOpened /> : <EyeClosed />}
          </TouchableOpacity>
        )}
      </HStack>
    </SafeAreaView>
  );
};

export const SearchField = ({
  value,
  onChangeText,
  placeholder,
  style,
  icon,
  leftIcon,
  inputStyle,
  withLeftIcon,
  leftIconStyle,
  right,
  rightIcon,
  pressed,
  editable,
  disabled,
}) => {
  return (
    <KeyboardAvoidingView>
      <HStack style={[styles.stackStyle, style]}>
        {icon}
        <TextInput
          style={[styles.search, inputStyle]}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={'#7C7C7C'}
          editable={editable}
        />
        {right ? (
          <TouchableOpacity onPress={pressed} disabled={disabled}>
            {rightIcon}
          </TouchableOpacity>
        ) : null}
        {withLeftIcon ? (
          <View style={[styles.viewStyle, leftIconStyle]}>{leftIcon}</View>
        ) : null}
      </HStack>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '85%',
    marginLeft: 12,
    paddingHorizontal: 17,
    borderLeftColor: '#D6D6D6',
    borderLeftWidth: 1,
  },
  search: {
    width: wp(230),
    height: 40,
    marginLeft: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 17,
    fontFamily: 'Poppins',
    color: Colors.smook40,
  },
  stackStyle: {
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 55,
    marginTop: hp(10),
    width: wp(305),
    color: 'black',
  },
  viewStyle: {
    position: 'relative',
    left: 27,
    marginLeft: hp(10),
    width: wp(40),
    backgroundColor: Colors.HexRed,
    alignItems: 'center',
    paddingVertical: hp(10),
    borderRadius: 5,
  },
  icon: {
    backgroundColor: '#F8F8F8',
    
    
    // alignSelf: 'flex-end',
    // bottom: '3%',
    // right: '48%',

    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
