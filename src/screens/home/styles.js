import {StyleSheet} from 'react-native';
import {hp, wp} from '../../utils';
import {Colors} from '../../assets/fonts/util/commonStyle';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.smokeWhite,
  },
  inputStyle: {
    marginLeft: hp(20),
    marginTop: hp(20),
    backgroundColor: Colors.white,
  },
  image: {
    width: wp(70),
    height: hp(90),

    // alignSelf: 'center',
  },
  title: {
    marginLeft: 15,
    bottom: 10,
    color: Colors.black,
    fontWeight: 'bold',
  },

  imageIcon: {
    width: wp(40),
    height: hp(60),
  },
  countryImageIcon: {
    width: wp(15),
    height: hp(20),
  },
  cardStyle: {
    backgroundColor: Colors.white,
    width: '93%',
    marginLeft: hp(20),
    paddingVertical: hp(10),
    marginTop: hp(10),
  },
  hstack: {
    position: 'relative',
    left: 90,
    bottom: 23,
    marginLeft: hp(10),
  },
  locationStyle: {
    alignSelf: 'center',
    // position: 'relative',
    // left: 90,

    marginTop: hp(5),
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 80,
    marginTop: 80,
    right: 0,
    bottom: 0,
    zIndex: 14,
  },

  imageBg: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  dotView: {
    position: 'relative',
    flex: 1,
    top: 20,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: hp(700),
  },

  imgStyle: {
    width: wp(120),
    height: hp(120),
  },
  sheetText: {
    textAlign: 'center',
  },
});
