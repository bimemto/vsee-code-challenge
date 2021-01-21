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
import FastImage from 'react-native-fast-image';
import Strings from '../constants/Strings';

export default function NewRows({item, itemClick}) {
  const viewDetails = (news) => {
    itemClick(news);
  };

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
}
