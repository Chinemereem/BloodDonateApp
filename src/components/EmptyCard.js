import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RegularText} from './Text';
import {ButtonWithIcon} from './button';
import {FontFamily, Colors} from '../assets/fonts/util/commonStyle';
import {hp, wp} from '../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyTitle: {
    fontFamily: FontFamily.poppinsRegular,
    marginBottom: hp(5),
    marginLeft: hp(10),
    fontSize: hp(18),
    color: Colors.primary,
  },
});

const EmptyItem = ({title, btnTitile, onPress}) => (
  <View style={{top: 40, alignItems: 'center'}}>
    <RegularText style={styles.emptyTitle} title={title} />

    <ButtonWithIcon
      title={btnTitile}
      style={{alignSelf: 'center', width: wp(160), marginTop: hp(20)}}
      onPress={onPress}
    />
  </View>
);

export default EmptyItem;
