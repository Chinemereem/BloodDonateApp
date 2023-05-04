/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { MyTab } from './src/navigator/myTab';
import store, {persistor} from './src/store';
import {RootSiblingParent} from 'react-native-root-siblings';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <RootSiblingParent>
            <MyTab />
          </RootSiblingParent>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
