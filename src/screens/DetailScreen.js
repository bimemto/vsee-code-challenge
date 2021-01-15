import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {getStatusBarHeight, isIphoneX} from 'react-native-iphone-x-helper';
import Strings from '../constants/Strings';

export const NewsDetailScreen = ({navigation}) => {
  const news = navigation.state.params.news;
  const PARALLAX_HEADER_HEIGHT = 280;
  const STICKY_HEADER_HEIGHT = getStatusBarHeight() + 60;

  const BackIcon = (style) => (
    <Image
      {...style}
      width={24}
      height={24}
      source={require('../assets/images/back.png')}
    />
  );

  const openWebView = () => {
    navigation.navigate('Full', {link: news.url, title: news.title});
  };

  const normalisedSource =
    news.urlToImage &&
    typeof news.urlToImage === 'string' &&
    !news.urlToImage.split('http')[1]
      ? Strings.DEFAULT_IMAGE_URL
      : news.urlToImage;

  return (
    <View style={{flex: 1}}>
      <ParallaxScrollView
        headerBackgroundColor="#333"
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        backgroundSpeed={10}
        renderBackground={() => (
          <View key="background">
            <Image
              style={{
                width: '100%',
                height: undefined,
                aspectRatio: 375 / 283,
              }}
              source={
                normalisedSource
                  ? {uri: normalisedSource}
                  : require('../assets/images/cover_news.png')
              }
              resizeMode="cover"
            />
            <View
              style={{
                position: 'absolute',
                top: 0,
                width: window.width,
                backgroundColor: 'rgba(0,0,0,.4)',
                height: PARALLAX_HEADER_HEIGHT,
              }}
            />
          </View>
        )}
        renderFixedHeader={() => (
          <View key="fixed-header" style={styles.fixedSection}>
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => {
                navigation.pop();
              }}>
              <BackIcon />
            </TouchableOpacity>
          </View>
        )}
        renderForeground={() => (
          <View
            style={{
              flexDirection: 'column',
              width: '100%',
              height: '10%',
              alignSelf: 'flex-end',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              position: 'absolute',
              bottom: 0,
              paddingTop: 50,
              paddingLeft: 20,
              paddingRight: 20,
              paddingBottom: 10,
            }}
          />
        )}>
        <View style={{padding: 20}}>
          <View style={{flexShrink: 1, width: '100%', marginBottom: 20}}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 10,
                  fontWeight: '600',
                  alignSelf: 'center',
                  marginStart: 5,
                }}>
                {news ? news.author : ''}
              </Text>
            </View>
            <Text
              style={{
                color: '#000000',
                fontSize: 20,
                fontWeight: '600',
                marginTop: 10,
                lineHeight: 30,
              }}>
              {news ? news.title : ''}
            </Text>

            <Text
              style={{
                color: '#999999',
                fontSize: 12,
                fontWeight: '600',
              }}>
              {news ? news.publishedAt : ''}
            </Text>

            <Text
              style={{
                color: '#000000',
                fontSize: 14,
                fontWeight: '600',
                alignSelf: 'center',
                marginTop: 20,
              }}>
              {news.content
                ? news.content.substring(0, news.content.indexOf('[+'))
                : ''}
            </Text>
          </View>

          <Button
            style={{
              width: 150,
              height: 50,
              borderRadius: 10,
              alignSelf: 'center',
            }}
            title="Read full article"
            onPress={() => openWebView()}></Button>
        </View>
      </ParallaxScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 256,
    padding: 16,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 256,
    padding: 16,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  fixedSection: {
    position: 'absolute',
    start: 10,
    top: isIphoneX() ? getStatusBarHeight() + 10 : 10,
  },

  btnBack: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
});
