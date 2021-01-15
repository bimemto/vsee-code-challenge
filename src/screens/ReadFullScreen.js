import React from 'react';
import {
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import {WebView} from 'react-native-webview';

export const ReadFullScreen = ({navigation}) => {
  const link = navigation.state.params.link;
  const title = navigation.state.params.title;

  const BackIcon = (style) => (
    <Image
      {...style}
      width={24}
      height={24}
      source={require('../assets/images/back.png')}
    />
  );

  const navigateBack = () => {
    console.log(link);
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          flexDirection: 'row',
          height: 56,
          alignItems: 'center',
        }}>
        <TouchableOpacity style={styles.btnBack} onPress={() => navigateBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: 'black',
          }}
          numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: '#B4B7CC',
          opacity: 0.4,
        }}
      />

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
});
