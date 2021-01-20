import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import {WebView} from 'react-native-webview';
import BackIcon from '../components/BackIcon';

export const ReadFullScreen = ({navigation}) => {
  const link = navigation.state.params.link; //link to article passed from detail screen
  const title = navigation.state.params.title; //title of the article passed from detail screen

  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.appbar}>
        <TouchableOpacity style={styles.btnBack} onPress={() => navigateBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={styles.space} />

      <WebView source={{uri: link}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btnBack: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },

  space: {
    width: '100%',
    height: 1,
    backgroundColor: '#B4B7CC',
    opacity: 0.4,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },

  appbar: {
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
  },
});
