import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Divider} from 'react-native-paper';
import {HStack} from '../../../components';
import {RegularText} from '../../../components';
import {BackArrorIcon} from '../../../assets/Svg';
import {hp} from '../../../utils';
const styles = StyleSheet.create({
  container: {
    top: 20,
  },
  justify: {justifyContent: 'space-between'},
});

export const Details = ({title, onPress}) => {
  return (
    <View style={styles.container}>
      <HStack style={styles.justify} onPress={onPress}>
        <RegularText
          title={title}
          style={{
            fontSize: hp(20),
            marginLeft: hp(10),
            marginTop: hp(10),
          }}
        />
        <TouchableOpacity style={{right: 10}}>
          <BackArrorIcon />
        </TouchableOpacity>
      </HStack>
      <Divider style={{marginTop: hp(20)}} />
      <Divider style={{marginTop: hp(10)}} />
    </View>
  );
};
