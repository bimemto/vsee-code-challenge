import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {NewsDetailScreen} from '../screens/DetailScreen';
import MainScreen from '../screens/MainScreen';
import {ReadFullScreen} from '../screens/ReadFullScreen';

const HomeNavigator = createStackNavigator(
  {
    News: MainScreen,
    Details: NewsDetailScreen,
    Full: ReadFullScreen,
  },
  {
    headerMode: 'none',
  },
);

export const RootNavigator = createAppContainer(HomeNavigator);
