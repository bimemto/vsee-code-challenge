import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  AppState,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../actions';
import * as network from '../repo/network';
import * as db from '../repo/db';
import FastImage from 'react-native-fast-image';
import realm from '../repo/realm';
import Strings from '../constants/Strings';

export default function MainScreen({navigation}) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

  const getNewsReducer = useSelector((state) => state.getNewsReducer);
  const {news} = getNewsReducer;

  useEffect(() => {
    getNews(false);
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
    }
    setAppState(nextAppState);
  };

  useEffect(() => {
    if (appState && appState === 'active') {
      getNews(true);
    }
  }, [appState]);

  const getNews = (isRefresh) => {
    if (!isRefresh) {
      const localNews = db.getLocalNews(realm);
      if (localNews.length == 0) {
        network.getNews((news, error) => {
          setLoading(false);
          setRefreshing(false);
          if (error) {
            dispatch(actions.getNewsError(error));
          } else {
            db.storeNews(realm, news);
            dispatch(actions.getNews(news));
          }
        });
      } else {
        dispatch(actions.getNews(localNews));
      }
    } else {
      network.getNews((news, error) => {
        setLoading(false);
        setRefreshing(false);
        if (error) {
          dispatch(actions.getNewsError(error));
        } else {
          db.storeNews(realm, news);
          dispatch(actions.getNews(news));
        }
      });
    }
  };

  const viewDetails = (news) => {
    navigation.navigate('Details', {
      news,
    });
  };

  const renderItem = ({item, index}) => {
    const normalisedSource =
      item.urlToImage &&
      typeof item.urlToImage === 'string' &&
      !item.urlToImage.split('http')[1]
        ? Strings.DEFAULT_IMAGE_URL
        : item.urlToImage;
    return (
      <TouchableOpacity onPress={() => viewDetails(item)}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              marginBottom: 5,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <FastImage
              style={{width: 80, height: 80, borderRadius: 10, marginEnd: 10}}
              source={{
                uri: normalisedSource
                  ? normalisedSource
                  : Strings.DEFAULT_IMAGE_URL,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={{flexShrink: 1, width: '100%'}}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.title}
              </Text>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontWeight: '500',
                  marginTop: 5,
                }}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.description}
              </Text>
              <Text
                style={{
                  color: '#999999',
                  fontSize: 12,
                  fontWeight: '600',
                  marginTop: 5,
                }}
                numberOfLines={1}>
                {item.publishedAt}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#d8d8d8',
              marginVertical: 5,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  let content;

  if (loading) {
    content = (
      <View style={styles.spinner}>
        <ActivityIndicator />
      </View>
    );
  } else {
    content = (
      <FlatList
        style={{
          paddingStart: 20,
          paddingEnd: 20,
          backgroundColor: 'white',
        }}
        contentContainerStyle={{paddingTop: 20, paddingBottom: 100}}
        renderItem={renderItem}
        data={news}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, i) => `flat_${i}`}
        refreshing={refreshing}
        onRefresh={() => getNews(true)}
      />
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 0,
        backgroundColor: '#303F9F',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
          justifyContent: 'center',
          backgroundColor: '#303F9F',
        }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '500',
            color: 'white',
          }}>
          News
        </Text>
      </View>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  title: {
    color: '#061058',
    opacity: 0.7,
    fontWeight: '500',
    marginStart: 20,
    marginTop: 10,
  },
});
