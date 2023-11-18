import React, {useState, useCallback} from 'react';

import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Logo} from '../../assets/index';
import {wp, hp} from '../../utils';
import {TextField} from '../../components/Textfield';
import {EmailIcon, LockIcon} from '../../assets/Svg';
import {RedText} from './Register';
import {useReduxAction} from '../../utils/useReduxApi';
import Button from '../../components/button';
import displayToast from '../../components/DisplayToast';
import {onLogin} from '../../store/auth/authSlice';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../../../firebase';
import KeyboardAvoidingContainer from '../../components/KeyboardAvoidingView';

const Login = () => {
  const {user} = useSelector(state => state.auth);
  const loggedUser = user?.email || '';
  const [email, setEmail] = useState(loggedUser);
  const [password, setPassword] = useState('Police101.,');
  const {handleAction, loading} = useReduxAction();
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleButton = useCallback(async () => {
    const response = await handleAction(onLogin, {email, password});

    if (response.meta.requestStatus === 'fulfilled') {
      displayToast('Logged in Succesfully', 'success');
      navigation.navigate('Home');
      onAuthStateChanged(auth, users => {
        if (users) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          displayToast('Logged in Succesfully', 'success');
          navigation.navigate('Home');
          // ...
        } else {
          // User is signed out
          // ...
          // console.log('user is logged out');
        }
      });
    }

    if (response.error) {
      displayToast(response.error.message, 'error');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const height = Dimensions.get('window').height;
  return (
    <KeyboardAvoidingContainer style={styles.background}>
      <ScrollView
        style={{marginTop: hp(80), maxHeight: 350}}>
        <Image source={Logo} resizeMode="contain" style={styles.image} />
        <Text style={styles.textInView}>
          <RedText>Dare</RedText> To <RedText>Donate</RedText>
        </Text>

        <View style={{marginBottom: 20}}>
          <TextField
            placeholder={'Fahimekan28@gmail.com'}
            style={{marginTop: hp(90)}}
            value={email}
            onChangeText={value => setEmail(value)}
            inputStyle={{fontWeight: '700', fontSize: hp(16), color: 'black'}}
            icon={<EmailIcon />}
          />
          <TextField
            placeholder={'***********'}
            icon={<LockIcon />}
            value={password}
            onChangeText={value => setPassword(value)}
            inputStyle={{fontWeight: '700', fontSize: hp(16), color: 'black'}}
            secureTextEntry={!showPassword ? true : false}
            isPassword={true}
            handleClickShowPassword={handleClickShowPassword}
            showPassword={showPassword}
          />
        </View>
      </ScrollView>
      <View>
        <Button
          onPress={handleButton}
          title={'LOG IN'}
          disabled={!email || !password}
          loading={loading}
        />
        <View style={styles.view}>
          <TouchableOpacity
            style={styles.touchableStyle}
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={{color: '#FF2156', fontSize: hp(17)}}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginTop: 10, alignItems: 'center'}}
            onPress={() => navigation.navigate('Register')}>
            <Text style={{color: '#7E7E7E', fontSize: hp(15)}}>
              Don’t have an account? <RedText>Register Now</RedText>.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingContainer>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    width: wp(60),
    height: wp(80),

    alignSelf: 'center',
  },
  redImage: {
    marginTop: 30,
  },

  text: {
    fontSize: 20,
    fontWeight: '300',
    fontFamily: 'Cochin',
    lineHeight: 25,
  },
  view: {
    // marginTop: hp(40),
  },
  hstack: {
    marginTop: hp(200),
  },

  touchableText: {
    color: 'red',
    fontSize: hp(17),
  },
  touchableStyle: {
    marginTop: hp(20),
    padding: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  textInView: {
    textAlign: 'center',
    marginTop: hp(10),
    marginBottom: hp(20),
    fontSize: hp(18),
    color: 'black',
  },
});

export default Login;
