import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TickIcon} from '../assets/Svg';
import {hp, wp} from '../utils';
import Colors from './Colors';
import {HStack} from './listview';
import {RegularText} from './Text';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(55),
    height: wp(35),
    borderRadius: hp(20),
    backgroundColor: Colors.smokeWhite,
  },
  selected: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.HexRed,
    width: wp(55),
    height: wp(35),
    borderRadius: hp(20),
  },
  tickIcon: {
    position: 'relative',
    left: 8,
    zIndex: 60,
  },
  title: {
    fontSize: hp(12),
  },
  text: {
    color: 'white',
  },
});

export const Selector = ({
  customText,
  onPress,
  selected,
  style,
  title,
  titleStyle,
  tickIconStyle,
  withIcon,
}) => {
  return (
    <TouchableOpacity
      style={[selected ? styles.selected : styles.container, style]}
      activeOpacity={0.7}
      onPress={onPress}>
      <HStack>
        {customText || (
          <RegularText
            title={title}
            style={[selected ? styles.text : styles.title, titleStyle]}
          />
        )}
        {selected && withIcon ? (
          <View style={[styles.tickIcon, tickIconStyle]}>
            <TickIcon />
          </View>
        ) : null}
      </HStack>
    </TouchableOpacity>
  );
};
