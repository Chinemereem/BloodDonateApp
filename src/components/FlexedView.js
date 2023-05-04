import React from 'react';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';
import {HStack} from './listview';
import {Card} from 'react-native-paper';

import {hp, wp} from '../utils';
// import {primary, white, Dark} from './Colors';

import {RegularText} from './Text';
export const FlexedView = ({
  title,
  icon,
  onPress,
  disabled,
  imageSource,
  style,
  text,
  textStyle,
}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    disabled={disabled}
    style={styles.flexedViewContainer}
    onPress={onPress}>
    <HStack style={{alignSelf: 'center'}}>
      <Card style={[styles.cardStyle, style]}>
        <Image
          source={imageSource}
          resizeMode="contain"
          style={styles.iconStyle}
        />

        {icon || <RegularText title={text} style={textStyle} />}
        <RegularText title={title} style={styles.semiTextStyle} />
      </Card>
    </HStack>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  flexedViewContainer: {
    marginLeft: hp(15),
  },

  cardStyle: {
    width: wp(50),
    height: hp(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: hp(6),
    padding: 10,

    shadowColor: '#2C2C2C',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  iconStyle: {
    width: wp(10),
  },
  semiTextStyle: {
    color: '#7E7E7E',

    // marginLeft: wp(-16),
  },
});
