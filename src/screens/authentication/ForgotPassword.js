/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';

import {StyleSheet, Text, Image, View, SafeAreaView} from 'react-native';
import {Success} from '../../assets/index';
import {wp, hp} from '../../utils';
import Button from '../../components/button';
import {TextField} from '../../components/Textfield';
import {EmailIcon} from '../../assets/Svg';
import {RedText} from '../../components/Text';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import {auth} from '../../../firebase';
import {useNavigation} from '@react-navigation/native';

const ForgotPassword = () => {
  const currentUser = auth.currentUser?.email;
  const [email, setEmail] = useState(currentUser);
  const [otpSent, setOtpSent] = useState(false);
  const [verifyOtp, setverifyOtp] = useState(false);
  const [coded, setCode] = useState('');
  const editable = currentUser ? !currentUser : null;
  const navigation = useNavigation();
  const handleSendOtp = () => {
    setOtpSent(true);
  };
  const handleVerifyOtp = () => {
    setverifyOtp(true);
  };
  // const handleSendOtp = useCallback(async () => {
  //   const response = await handleAction(forgotPassword, email);
  //   if (response.meta.requestStatus === 'fulfilled') {
  //     displayToast('A link has been sent to your register email', 'success');
  //     // setOtpSent(true);
  //     navigation.navigate('Login');
  //   }

  //   if (response.error) {
  //     displayToast(response.error.message, 'error');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <SafeAreaView style={[styles.background]}>
      <View style={{marginLeft: hp(30)}}>
        {otpSent === false ? (
          <>
            <TextField
              placeholder={'Fahimekan28@gmail.com'}
              style={{width: '90%'}}
              icon={<EmailIcon />}
              value={email}
              onChangeText={text => setEmail(text)}
              editable={editable}
            />
            <Text style={{marginTop: hp(20), fontSize: hp(17), lineHeight: 28}}>
              Your password reset will be send in your {'\n'} registered email
              address.
            </Text>
            <View style={styles.view}>
              <Button
                onPress={() => {
                  handleSendOtp();
                }}
                title={'Send'}
              />
            </View>
          </>
        ) : (
          <>
            {verifyOtp === false ? (
              <>
                <OTPInputView
                  handleChange={code => {
                    setCode(code);
                  }}
                  numberOfInputs={4}
                  inputContainerStyles={{
                    width: '20%',

                    marginRight: hp(20),
                  }}
                  keyboardType={'name-phone-pad'}
                  inputStyles={{
                    backgroundColor: '#F8F8F8',
                    paddingVertical: '25%',

                    borderColor: 'blue',
                    padding: hp(10),
                    fontSize: hp(20),
                  }}
                />
                <View style={styles.view}>
                  <RedText
                    style={{
                      textAlign: 'right',
                      marginTop: hp(20),
                      width: '90%',
                    }}>
                    Resend Code 49 Sec
                  </RedText>
                  <Button
                    onPress={() => {
                      handleVerifyOtp();
                    }}
                    title={'Verify'}
                  />
                </View>
              </>
            ) : (
              <>
                <Image
                  source={Success}
                  resizeMode="contain"
                  style={{width: wp(120), height: hp(120), alignSelf: 'center'}}
                />
                <Button
                  onPress={() => navigation.navigate('Login')}
                  title={'Finish'}
                />
              </>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    width: wp(60),
    height: wp(80),
    alignSelf: 'center',
  },

  text: {
    fontSize: 20,
    fontWeight: '300',
    fontFamily: 'Cochin',
    lineHeight: 25,
  },
  view: {
    marginTop: hp(20),
  },
});

export default ForgotPassword;
