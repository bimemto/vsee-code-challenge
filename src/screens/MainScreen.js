import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  AppState,
  Button,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../actions';
import * as network from '../repo/network';
import * as db from '../repo/db';
import realm from '../repo/realm';
import NewsRow from '../components/NewsRow';
import Strings from '../constants/Strings';

let page = 1;

export default function MainScreen({navigation}) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false); //loading state indicate wether news is loading or not
  const [loadingMore, setLoadingMore] = useState(false); //loading more state indicate wether news is loading or not
  const [refreshing, setRefreshing] = useState(false); //refreshing state to use on refresh of FlatList
  const [appState, setAppState] = useState(AppState.currentState); //get the app state to check when app come from background to foreground to reload news

  //to detect when scroll to end of list
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);
  //check when we reach the end of news, no more news to load
  const [endOfPage, setEndOfPage] = React.useState(false);

  //reducer store to poppulate news to FlatList
  const getNewsReducer = useSelector((state) => state.getNewsReducer);
  const {news, error} = getNewsReducer;

  useEffect(() => {
    //get news when app start
    getNews(false, false);
    //add app state event listener to detect when app come to from background to foreground
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

  //when app come from background to foreground, reload news automatically
  useEffect(() => {
    if (appState && appState === 'active') {
      getNews(true, false);
    }
  }, [appState]);

  const getNews = (isRefresh, isLoadMore) => {
    /* If not refreshing news, check if user do load more or not.
    If load more then fetch news from network otherwise display news from local database */
    if (!isRefresh) {
      if (isLoadMore) {
        setLoadingMore(true);
        network.getNews(page, (articles, error) => {
          setLoading(false);
          setRefreshing(false);
          setLoadingMore(false);
          if (error) {
            console.log(error);
            setEndOfPage(true);
          } else {
            if (articles.length === 0) {
              setEndOfPage(true);
            } else {
              let allArticles = news.concat(articles);
              dispatch(actions.getNews(allArticles));
            }
          }
        });
      } else {
        const localNews = db.getLocalNews(realm);
        /* If app start for the first time, local database is empty then we fetch news from network.
        Otherwise we display news from local database */
        if (localNews.length === 0) {
          fetchFromNetwork();
        } else {
          dispatch(actions.getNews(localNews));
        }
      }
    } else {
      /*If user do a refresh action or auto refresh when app come from background to foreground,
      fetch news from network normally*/
      page = 1;
      setRefreshing(true);
      setEndOfPage(false);
      fetchFromNetwork();
    }
  };

  const fetchFromNetwork = () => {
    network.getNews(page, (articles, error) => {
      setLoading(false);
      setRefreshing(false);
      if (error) {
        console.log(error);
        dispatch(actions.getNewsError(error));
      } else {
        db.storeNews(realm, articles);
        dispatch(actions.getNews(articles));
      }
    });
  };

  //render footer to show when listview is loading more
  const renderFooter = () => {
    if (loadingMore) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={Strings.MAIN_COLOR} />
        </View>
      );
    } else {
      if (endOfPage) {
        return (
          <View style={styles.loading}>
            <Text style={styles.endTitle}>No more articles</Text>
          </View>
        );
      } else {
        return null;
      }
    }
  };

  const handleLoadMore = () => {
    if (!onEndReachedCalledDuringMomentum) {
      if (!endOfPage) {
        page += 1;
        getNews(false, true);
      }
      setOnEndReachedCalledDuringMomentum(true);
    }
  };

  const openDetail = (news) => {
    navigation.navigate('Details', {
      news,
    });
  };

  const renderItem = ({item, index}) => {
    return <NewsRow item={item} itemClick={openDetail} />;
  };

  const renderErrorView = () => {
    return (
      <View style={styles.spinnerContainer}>
        <Text style={{fontSize: 20, marginBottom: 10}}>Oops</Text>
        <Text style={{marginBottom: 10}}>{error.message}</Text>
        <Button
          style={{
            width: 150,
            height: 50,
            borderRadius: 10,
            alignSelf: 'center',
          }}
          title="Try again"
          onPress={() => getNews(false, false)}></Button>
      </View>
    );
  };

  const renderLoadingView = () => {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator />
      </View>
    );
  };

  const renderListView = () => {
    return (
      <FlatList
        testID="flat-list"
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
        onRefresh={() => getNews(true, false)}
        onMomentumScrollBegin={() => {
          setOnEndReachedCalledDuringMomentum(false);
        }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    );
  };

  let content;

  if (loading) {
    content = renderLoadingView();
  } else if (error) {
    content = renderErrorView();
  } else {
    content = renderListView();
  }

  return (
    <SafeAreaView
      style={{
        flex: 0,
        backgroundColor: Strings.MAIN_COLOR,
      }}>
      <View styles={{flex: 1}}>
        <View style={styles.appbar}>
          <Text style={styles.appTitle}>News</Text>
        </View>
        {content}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  spinnerContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  title: {
    color: '#061058',
    opacity: 0.7,
    fontWeight: '500',
    marginStart: 20,
    marginTop: 10,
  },

  loading: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    minHeight: 100,
  },

  appbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'center',
    backgroundColor: Strings.MAIN_COLOR,
  },

  appTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: 'white',
  },

  endTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: 'black',
  },
});
