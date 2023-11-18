import React from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import * as Svg from '../assets/Svg';
import {hp} from '../utils';
import {bloodDropPng} from '../assets';
import Login from '../screens/authentication/Login';
import Home from '../screens/home/Home';
import Header from '../screens/onboarding';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from '../screens/authentication/Register';
import ForgotPassword from '../screens/authentication/ForgotPassword';
import Request from '../screens/home/requests/Request';
import SearchScreen from '../screens/home/Search';
import Profile from '../screens/home/profile/Profile';
import CountyApp from '../screens/home/profile/country';
import FindDonnors from '../screens/home/findDonnors/FindDonnors';
import DonnorsDetails from '../screens/home/findDonnors/DonnorsDetails';
import ProfileBtSheet from '../screens/home/profile/ProfileBottomSheet';
import CreateRequest from '../screens/home/requests/CreateRequest';
import Report from '../screens/home/assistant/Report';
import Assistant from '../screens/home/assistant/Assistant';
import InvitContacts from '../screens/home/profile/InviteContacts';
import Location from '../screens/home/common/Location';
import Config from 'react-native-config';
const Stack = createNativeStackNavigator();
const {API_KEY} = Config;
  console.log(API_KEY, 'API_KEY================');
  console.log( 'API_KEY================');
export const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Header"
        component={Header}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="CountryApp" component={CountyApp} />
      <Stack.Screen name="ProfileBtSheet" component={ProfileBtSheet} />
      <Stack.Screen
        name="CreateRequest"
        component={CreateRequest}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Assistant"
        component={Assistant}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Report"
        component={Report}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FindDonnors"
        component={FindDonnors}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DonnorsDetails"
        component={DonnorsDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="InvitContacts"
        component={InvitContacts}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={TabBar}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Location"
        component={Location}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export const TabBar = () => {
  const _renderIcon = (routeName, selectedTab) => {
    switch (routeName) {
      case 'HomeView':
        return (
          <Svg.HomeIcon
            fill={routeName === selectedTab ? '#FF2156' : '#B3B3B3'}
          />
        );
      case 'title2':
        return (
          <Svg.MenuIcon
            fill={routeName === selectedTab ? '#FF2156' : '#B3B3B3'}
          />
        );

      case 'title3':
        return (
          <Svg.VIcon fill={routeName === selectedTab ? '#FF2156' : '#B3B3B3'} />
        );

      case 'title4':
        return (
          <Svg.PersonIcon
            fill={routeName === selectedTab ? '#FF2156' : '#B3B3B3'}
          />
        );
    }

    return (
      <Svg.DropIcon color={routeName === selectedTab ? '#FF2156' : '#B3B3B3'} />
    );
  };
  const renderTabBar = ({routeName, selectedTab, navigate}) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <CurvedBottomBar.Navigator
        style={styles.bottomBar}
        strokeWidth={0.5}
        strokeColor="#DDDDDD"
        height={55}
        circleWidth={55}
        bgColor="white"
        initialRouteName="HomeView"
        borderTopLeftRight
        renderCircle={({selectedTab, navigate}) => (
          <Animated.View style={styles.btnCircle}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Image
                source={bloodDropPng}
                style={{alignSelf: 'center', marginBottom: hp(12)}}
              />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}>
        <CurvedBottomBar.Screen
          name="HomeView"
          options={{
            headerShown: false,
          }}
          position="LEFT"
          component={Home}
        />
        <CurvedBottomBar.Screen
          name="title2"
          options={{
            headerShown: false,
          }}
          component={SearchScreen}
          position="LEFT"
        />
        <CurvedBottomBar.Screen
          name="title3"
          options={{
            headerShown: false,
          }}
          component={Request}
          position="RIGHT"
        />
        <CurvedBottomBar.Screen
          name="title4"
          component={Profile}
          position="RIGHT"
          options={{
            headerShown: false,
          }}
        />
      </CurvedBottomBar.Navigator>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    marginVertical: 5,
  },

  btnCircle: {
    width: 60,
    height: 60,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
    bottom: 30,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  img: {
    width: 30,
    height: 30,
  },
  bottomBar: {
    marginTop: hp(0),
  },
});
