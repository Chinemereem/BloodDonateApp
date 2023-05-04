import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../utils';
import {Colors} from '../../../assets/fonts/util/commonStyle';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  cardViewStyle: {
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 0,
    width: '95%',
    marginTop: hp(30),
    marginLeft: hp(10),
    paddingVertical: hp(15),
  },
  margined: {
    marginTop: hp(40),
  },
  padding: {
    paddingVertical: hp(50),
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    height: hp(400),
    width: wp(300),
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  image: {
    height: hp(150),
    width: wp(150),
  },
  touchable: {
    backgroundColor: Colors.HexRed,
    height: hp(30),
    width: wp(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: hp(20),
  },
  modalRegularText: {
    color: '#26323880',
    marginTop: hp(20),
    lineHeight: 21,
    textAlign: 'center',
  },
  inputStyle: {
    width: '92%',
    marginLeft: hp(15),
    marginTop: hp(20),
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 0,
    color: '#7C7C7C',
  },
  safeContainer: {
    flex: 1,
    justifyContent: 'center',

    backgroundColor: Colors.smokeWhite,
  },
  invitInputStyle: {
    width: '80%',
    marginLeft: hp(20),
    marginTop: hp(20),
    backgroundColor: Colors.white,
  },
});
