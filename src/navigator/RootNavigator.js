import React from 'react';
import {NewsDetailScreen} from '../screens/DetailScreen';
import MainScreen from '../screens/MainScreen';
import {ReadFullScreen} from '../screens/ReadFullScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="News"
          component={MainScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Details"
          component={NewsDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Full"
          component={ReadFullScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const HomeNavigator = createStackNavigator(
//   {
//     News: MainScreen,
//     Details: NewsDetailScreen,
//     Full: ReadFullScreen,
//   },
//   {
//     headerMode: 'none',
//   },
// );

// export const RootNavigator = createAppContainer(HomeNavigator);
