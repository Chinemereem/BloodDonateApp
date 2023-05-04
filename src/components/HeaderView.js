import React from 'react';
import {View, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {isIPhoneX} from 'react-native-status-bar-height';
import {BackIcon, EditIcon} from '../assets/Svg';
import {hp} from '../utils';
import {RegularText} from './Text';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? hp(40) : 0,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
  },
  textStyle: {
    alignSelf: 'center',
    marginTop: 0,
    flexGrow: 0,
    textAlign: 'center',
    marginRight: '11%',
  },
  backIcon: {
    marginTop: 0,
    marginLeft: 0,
  },
  mainHeader: {
    marginTop: Platform.OS === 'ios' ? (isIPhoneX() ? hp(40) : hp(25)) : 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightIconStyle: {
    position: 'relative',
    left: 60,
    marginLeft: hp(70),
  },
  right: {
    left: 30,
  },
});

const HeaderWithIcon = ({
  icon,
  title,
  onPress,
  right,
  style,
  iconStyle,
  titleStyle,
  rightStyle,
  backIconColor,
  rightIcon,
  rightIconStyle,
  Edit,
  useIcon,
}) => {
  const navigation = useNavigation();
  const handleButton = () => {
    navigation.goBack();
  };
  return (
    <View
      style={icon === false ? style || styles.container : styles.mainHeader}>
      {icon !== false && (
        <TouchableOpacity onPress={() => handleButton()} style={iconStyle}>
          <BackIcon color={backIconColor} />
        </TouchableOpacity>
      )}
      <RegularText
        title={title}
        style={[
          icon !== false
            ? styles.textStyle
            : {alignSelf: 'center', marginTop: 0},
          titleStyle,
        ]}
      />
      {right && <View style={[styles.right, rightStyle]}>{right}</View>}
      {rightIcon ? (
        <TouchableOpacity
          onPress={Edit}
          style={[styles.rightIconStyle, rightIconStyle]}>
          <EditIcon />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default HeaderWithIcon;
