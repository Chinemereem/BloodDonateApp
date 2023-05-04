import React, {useState} from 'react';
import {View, SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native';
import {HStack} from './listview';
import {hp} from '../utils';
import {Colors} from '../assets/fonts/util/commonStyle';
import {RegularText} from './Text';
import {CheckIcon} from '../assets/Svg';

const styles = StyleSheet.create({
  container: {
    minWidth: '30%',
    padding: hp(10),
  },
  headerText: {
    fontSize: hp(20),
    marginLeft: hp(5),
  },
  textStyle: {
    fontSize: 15,
    fontWeight: '700',
    marginLeft: hp(5),
    color: Colors.hexGreen,
  },
  viewIconStyle: {
    marginTop: hp(10),
  },
  regularTextStyle: {
    marginLeft: hp(25),
    color: Colors.black,
  },
  iconStyle: {
    position: 'absolute',
    left: '80%',
  },
  flexedView: {
    marginTop: hp(-10),
  },
  vieStyle: {
    padding: 5,
    borderRadius: 70,
    marginLeft: hp(10),
  },
  profilePic: {
    borderRadius: hp(99),
  },
});
const ListItem = props => {
  return (
    <View style={{justifyContent: 'center'}}>
      <TouchableOpacity onPress={props.onPress}>
        <HStack style={[styles.container]}>
          <View style={styles.viewIconStyle}>{props.icon}</View>
          <RegularText title={props.phoneNumbers} style={styles.textStyle} />
          <RegularText title={props.headerTitle} style={styles.textStyle} />
          {props.clicked ? (
            <View style={styles.iconStyle}>
              <CheckIcon />
            </View>
          ) : null}

          <RegularText
            title={props.text}
            style={[styles.regularTextStyle, props.regularTextStyle]}
          />
        </HStack>
        <RegularText title={props.title} style={styles.regularTextStyle} />
        <View style={styles.flexedView}>{props.children}</View>
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;
