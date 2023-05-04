import React, {useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  useColorScheme,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import {BroBg, Group, Rafiki, Bloodbar, Logo} from '../../assets/index';
import Colors from '../../components/Colors';
import {wp, hp} from '../../utils/index';
import {HStack} from '../../components/listview';
import Button from '../../components/button';
import Login from '../authentication/Login';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [screen, setscreen] = useState(1);
  const ref = useRef;
  const value = 1;
  const prevCount = screen;
  const [showWelcome, setShowWelcome] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    async function checkWelcome() {
      const welcomeDisplayed = await AsyncStorage.getItem('welcomeDisplayed');
      if (!welcomeDisplayed) {
        setShowWelcome(true);
        await AsyncStorage.setItem('welcomeDisplayed', 'true');
      }
    }
    checkWelcome();
  }, []);

  useEffect(() => {
    ref.current = value;

    if (prevCount && screen === 4) {
      setscreen(1);
    }
  }, [screen, prevCount, ref, value]);
  const handleImage = () => {
    if (screen === 1) {
      return BroBg;
    }
    if (screen === 2) {
      return Rafiki;
    }
    if (screen === 3) {
      return Logo;
    }
    return BroBg;
  };
  const handleBtn = () => {
    setscreen(screen + 1);
  };
  const handleText = () => {
    if (screen === 1) {
      return 'Find Blood Donors';
    }
    if (screen === 2) {
      return 'Post A Blood Request';
    }
    if (screen === 3) {
      return 'Dare To Donate';
    }
    return null;
  };
  const barImg = () => {
    if (screen === 1) {
      return Group;
    }
    if (screen === 2) {
      return Bloodbar;
    }
    return null;
  };
  const handleTitle = () => {
    if (screen === 1) {
      return 'Once a blood donor, always a lifesaver';
    }
    if (screen === 2) {
      return 'Want to watch a miracle? Go and donate blood.';
    }
    if (screen === 3) {
      return "Don't be “A negative”; be “O positive”";
    }
    return null;
  };
  return (
    <>
      {showWelcome ? (
        <View
          accessibilityRole="image"
          testID="new-app-screen-header"
          style={[
            styles.background,
            {
              backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
            },
          ]}>
          <Image
            source={handleImage()}
            resizeMode="contain"
            style={styles.image}
          />
          <Text
            style={{
              textAlign: 'center',
              marginTop: hp(60),
              marginBottom: hp(20),
            }}>
            {handleText()}
          </Text>
          <Text
            style={[
              styles.text,
              {
                color: isDarkMode ? Colors.white : Colors.black,
              },
            ]}>
            {handleTitle()}
          </Text>
          <Image
            source={barImg()}
            resizeMode="contain"
            style={styles.redImage}
          />
          {screen === 3 ? (
            <>
              <Button
                style={{
                  borderColor: '#FF2156',
                  borderWidth: 2,
                  borderRadius: 20,
                  backgroundColor: '#ffff',
                }}
                onPress={() => navigation.navigate('Login')}
                title={'LOG IN'}
                titleStyle={{color: '#FF2156'}}
              />

              <Button
                onPress={() => navigation.navigate('Register')}
                title={'REGISTER'}
                titleStyle={{color: '#ffffff', fontSize: hp(17)}}
              />
            </>
          ) : (
            <HStack style={styles.hstack}>
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => setscreen(3)}>
                <Text style={{fontSize: hp(18)}}> Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleBtn()}>
                <Text style={styles.touchableText}> Next</Text>
              </TouchableOpacity>
            </HStack>
          )}
        </View>
      ) : (
        <Login />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    paddingBottom: hp(290),
    paddingTop: 96,
    paddingHorizontal: 32,
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: wp(298),
    height: wp(180),

    overflow: 'hidden',
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
    marginTop: hp(40),
  },
  hstack: {
    marginTop: hp(200),
  },
  touchable: {
    flex: 1,
  },
  touchableText: {
    color: 'red',
    fontSize: hp(17),
  },
});

export default Header;
