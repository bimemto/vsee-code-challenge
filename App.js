/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {RootNavigator} from './src/navigator/RootNavigator';
import {Provider} from 'react-redux';
import store from './src/store';
import Strings from './src/constants/Strings';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Strings.MAIN_COLOR}
      />
      <RootNavigator />
    </Provider>
  );
};

export default App;
