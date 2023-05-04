import React, {useState, useCallback, useEffect} from 'react';
import firebase from 'firebase/compat';
import {auth} from '../../../firebase';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Logo} from '../../assets/index';
import {wp, hp} from '../../utils';
import {TextField} from '../../components/Textfield';
import {sendEmailVerification} from 'firebase/auth';
import {
  EmailIcon,
  LockIcon,
  UserIcon,
  PhoneIcon,
  DropIcon,
  LocationIcon,
} from '../../assets/Svg';
import Button from '../../components/button';
import {useReduxAction} from '../../utils/useReduxApi';
import {createUser, setUserDetail} from '../../store/auth/authSlice';
import displayToast from '../../components/DisplayToast';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
export const RedText = ({title, children}) => {
  return (
    <Text
      style={{
        color: '#FF2156',
      }}>
      {title}
      {children}
    </Text>
  );
};
const Register = ({navigation}) => {
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [userName, setName] = useState('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const userData = {
    name: userName,
    email: email,
    avater: null,
    country: country,
    bloodGroup: bloodGroup,
    phone: phone,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  // const {user} = useSelector(state => state.auth);
  const handleSignUp = () => {
    setLoading(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;

        dispatch(createUser(userCredential.user));
        // Send email verification
        user
          .sendEmailVerification()
          .then(response => {
            setLoading(false);

            displayToast(
              'Account created successfully, check your email for verification link!',
              'success',
            );
          })
          .catch(error => {
            displayToast(error.message, 'error');
          });

        firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .set(userData)
          .then(data => {})
          .catch(error => displayToast(error, 'errrrrr'));
        return user.updateProfile({displayName: userName, phoneNumber: phone});
      })
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(error => {
        displayToast(error.message, 'error');

        setLoading(false);
      });
  };

  // const handleSignUpButton = useCallback(async () => {
  //   const response = await handleAction(createUser, {email, password});
  //   // firebase.firestore().collection('users').add({
  //   // name: userName,
  //   // email: email,
  //   // avater: null,
  //   // country: country,
  //   // bloodGroup: bloodGroup,
  //   // });

  //   if (response.meta.requestStatus === 'fulfilled') {
  //     response.sendEmailVerification;
  //     response.user.updateProfile(update);
  //     displayToast('Account Created Succesfully', 'success');
  //     navigation.navigate('Login');
  //   }

  //   if (response.error) {
  //     displayToast(response.error.message, 'error');
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [email, password, navigation]);

  return (
    <SafeAreaView style={[styles.background]}>
      <View style={{marginTop: hp(20)}}>
        <Image source={Logo} resizeMode="contain" style={styles.image} />
        <Text
          style={{
            textAlign: 'center',
            marginTop: hp(10),
            marginBottom: hp(20),
            fontSize: hp(18),
            color: 'black',
          }}>
          <RedText>Dare</RedText> To <RedText>Donate</RedText>
        </Text>
        <TextField
          value={userName}
          placeholder={'anie okeke'}
          icon={<UserIcon />}
          onChangeText={value => setName(value)}
          inputStyle={{color: 'black'}}
        />
        <TextField
          value={email}
          placeholder={'anieokeke123456@gmail.com'}
          style={{marginTop: hp(20)}}
          icon={<EmailIcon />}
          onChangeText={value => setEmail(value)}
          inputStyle={{color: 'black'}}
        />
        <TextField
          placeholder={'***********'}
          icon={<LockIcon />}
          value={password}
          onChangeText={value => setPassword(value)}
          inputStyle={{color: 'black'}}
        />
        <TextField
          placeholder={'+2349016281672'}
          icon={<PhoneIcon />}
          value={phone}
          onChangeText={value => setPhone(value)}
          inputStyle={{color: 'black'}}
        />
        <TextField
          placeholder={'O+'}
          icon={<DropIcon />}
          value={bloodGroup}
          onChangeText={value => setBloodGroup(value)}
          inputStyle={{color: 'black'}}
        />
        <TextField
          placeholder={'Lagos, Ng.'}
          icon={<LocationIcon />}
          value={country}
          onChangeText={value => setCountry(value)}
          inputStyle={{color: 'black'}}
        />
        <Button
          title={'REGISTER'}
          onPress={() => {
            handleSignUp();
          }}
          disabled={!email || !bloodGroup || !userName || !password}
          loading={loading}
        />
      </View>
      <TouchableOpacity
        style={{marginTop: hp(20)}}
        onPress={() => navigation.navigate('Login')}>
        <Text style={{marginTop: hp(10), color: '#7E7E7E', fontSize: hp(15)}}>
          Already have an account? <RedText> Log In</RedText>.
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
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

  text: {
    fontSize: 20,
    fontWeight: '300',
    fontFamily: 'Cochin',
    lineHeight: 25,
  },
  view: {
    marginTop: hp(40),
  },
  hstack: {
    marginTop: hp(200),
  },
  touchable: {
    flex: 1,
  },
  touchableText: {
    color: 'green',
    fontSize: hp(17),
  },
});

export default Register;
