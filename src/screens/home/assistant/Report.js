import React from 'react';
import {SafeAreaView, StyleSheet, SafeAreaViewt, Image} from 'react-native';
import HeaderWithIcon from '../../../components/HeaderView';
import {testTube} from '../../../assets';
import {hp, wp} from '../../../utils';
import {Colors} from '../../../assets/fonts/util/commonStyle';
import {RegularText, HStack} from '../../../components';
import {LocationIcon} from '../../../assets/Svg';
import {Card} from 'react-native-paper';
import {FlexedView} from '../../../components/FlexedView';
import {ButtonWithIcon} from '../../../components/button';
import {useSelector} from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {alignSelf: 'center', width: wp(200), height: hp(200)},
  cardStyle: {
    backgroundColor: Colors.white,
    width: wp(90),
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(80),
    marginTop: hp(20),
    marginLeft: hp(20),
    paddingVertical: hp(10),
  },
  cardViewStyle: {
    backgroundColor: Colors.white,
    borderRadius: 0,
    width: '95%',
    marginTop: hp(10),
    marginLeft: hp(10),
    paddingVertical: hp(15),
  },
  margined: {
    marginTop: hp(40),
  },
});

const Report = () => {
  const {data} = useSelector(state => state.auth);
  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithIcon
        title={'Report'}
        titleStyle={{fontSize: hp(21), marginLeft: hp(30)}}
        iconStyle={{marginLeft: hp(20)}}
      />
      <HStack style={{alignSelf: 'center', marginTop: hp(20)}}>
        <LocationIcon />
        <RegularText title={' Reseach Center'} style={{color: '#7C7C7C'}} />
      </HStack>
      <RegularText
        title={data?.country}
        style={{color: '#7C7C7C', textAlign: 'center', marginTop: hp(10)}}
      />
      <Image source={testTube} resizeMode="contain" style={styles.image} />

      <HStack style={{marginTop: hp(20), alignSelf: 'center'}}>
        <FlexedView
          text={'0 mmol/L'}
          title="Glucose"
          style={{width: wp(95), height: hp(90)}}
        />
        <FlexedView
          text={'0 mmol/L'}
          title="Cholesterol"
          style={{width: wp(95), height: hp(90)}}
        />
        <FlexedView
          text={'0 mmol/L'}
          title="Bilirubin"
          style={{width: wp(95), height: hp(90)}}
        />
      </HStack>
      <HStack style={{marginTop: hp(20), alignSelf: 'center'}}>
        <FlexedView
          text={'0 ml/L'}
          title="RBC"
          style={{width: wp(95), height: hp(90)}}
        />
        <FlexedView
          text={'0 fl'}
          title="MCV"
          style={{width: wp(95), height: hp(90)}}
        />

        <FlexedView
          text={'0 bL'}
          title="Platelets"
          style={{width: wp(95), height: hp(90)}}
        />
      </HStack>
      <ButtonWithIcon
        title={'My Report'}
        style={{top: 50, marginTop: hp(40), alignSelf: 'center'}}
      />
    </SafeAreaView>
  );
};

export default Report;
