import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import {hp, wp} from '../utils';
import {HStack} from './listview';
import {Colors} from '../assets/fonts/util/commonStyle';
const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: '#FF2156',
    borderRadius: hp(20),
    padding: 10,
    paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(30),
    width: wp(310),
    height: hp(49),
  },
});

const Button = ({
  titleStyle,
  style,
  onPress,
  title,
  disabled,
  disabledColor = Colors.cozyRed,
  color,
  loading,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.btnStyle,
        {backgroundColor: disabled ? disabledColor : color || Colors.HexRed},
        style,
      ]}
      onPress={onPress}
      disabled={disabled}>
      {loading ? (
        <ActivityIndicator color={Colors.white} size="small" />
      ) : (
        <Text style={[{fontSize: hp(18), color: '#ffff'}, titleStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

export const ButtonWithIcon = ({
  titleStyle,
  style,
  onPress,
  title,
  icon,
  loading,
  disabled,
  disabledColor = Colors.cozyRed,
  color,
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: '#FF2156',
          borderRadius: hp(5),
          padding: 10,
          paddingHorizontal: 7,
          alignItems: 'center',
          marginTop: hp(10),
          width: '35%',
        },
        {backgroundColor: disabled ? disabledColor : color || Colors.HexRed},
        style,
      ]}
      onPress={onPress}
      disabled={disabled}>
      <HStack>
        {icon}
        {loading ? (
          <ActivityIndicator color={Colors.white} size="small" />
        ) : (
          <Text
            style={[
              {
                fontSize: hp(15),
                color: '#ffff',
                fontFamily: 'Poppins',
                marginLeft: hp(10),
              },
              titleStyle,
            ]}>
            {title}
          </Text>
        )}
      </HStack>
    </TouchableOpacity>
  );
};
