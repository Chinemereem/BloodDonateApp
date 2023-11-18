/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {MyStack} from './src/navigator/Tab';
import store, {persistor} from './src/store';
import {RootSiblingParent} from 'react-native-root-siblings';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <RootSiblingParent>
            <MyStack />
          </RootSiblingParent>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
