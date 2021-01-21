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
import BackIcon from '../components/BackIcon';

export const NewsDetailScreen = ({route, navigation}) => {
  const news = route.params.news;
  const PARALLAX_HEADER_HEIGHT = 280;
  const STICKY_HEADER_HEIGHT = getStatusBarHeight() + 60;

  /*Open webview screen to read full article */
  const openWebView = () => {
    navigation.navigate('Full', {link: news.url, title: news.title});
  };

  //check image url to ensure there is no invalid url tobe loaded in article image
  const normalisedSource =
    news.urlToImage &&
    typeof news.urlToImage === 'string' &&
    !news.urlToImage.split('http')[1]
      ? Strings.DEFAULT_IMAGE_URL
      : news.urlToImage;

  /*
      Render parallax scroll view wit backdrop image
       */
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
              style={styles.cover}
              source={
                normalisedSource
                  ? {uri: normalisedSource}
                  : require('../assets/images/cover_news.png')
              }
              resizeMode="cover"
            />
            <View style={styles.space} />
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
        renderForeground={() => <View style={styles.foreground} />}>
        <View style={{padding: 20}}>
          <View style={{flexShrink: 1, width: '100%', marginBottom: 20}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.author}>{news ? news.author : ''}</Text>
            </View>
            <Text style={styles.title}>{news ? news.title : ''}</Text>

            <Text style={styles.time}>{news ? news.publishedAt : ''}</Text>

            <Text style={styles.content}>
              {news.content
                ? news.content.substring(0, news.content.indexOf('[+'))
                : ''}
            </Text>
          </View>

          <Button
            style={styles.button}
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

  button: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
  },

  content: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: 20,
  },

  time: {
    color: '#999999',
    fontSize: 12,
    fontWeight: '600',
  },

  title: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
    lineHeight: 30,
  },

  author: {
    color: '#000000',
    fontSize: 10,
    fontWeight: '600',
    alignSelf: 'center',
    marginStart: 5,
  },

  foreground: {
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
  },

  space: {
    position: 'absolute',
    top: 0,
    width: window.width,
    backgroundColor: 'rgba(0,0,0,.4)',
    height: 280,
  },

  cover: {
    width: '100%',
    height: undefined,
    aspectRatio: 375 / 283,
  },
});
