import React from 'react';
import {NewsDetailScreen} from '../screens/DetailScreen';
import MainScreen from '../screens/MainScreen';
import {ReadFullScreen} from '../screens/ReadFullScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="News" component={MainScreen} />
        <Stack.Screen name="Details" component={NewsDetailScreen} />
        <Stack.Screen name="Full" component={ReadFullScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
