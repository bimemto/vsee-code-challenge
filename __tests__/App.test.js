import * as React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import RootNavigator from '../src/navigator/RootNavigator';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const mockData = [
  {
    author: 'Author 1',
    title: 'News title 1',
    description: 'News desc 1',
    url: 'url 1',
    urlToImage: 'image url 1',
    publishedAt: 'date 1',
    content: 'news content 1',
  },
  {
    author: 'Author 2',
    title: 'News title 2',
    description: 'News desc 2',
    url: 'url 2',
    urlToImage: 'image url 2',
    publishedAt: 'date 2',
    content: 'news content 2',
  },
  {
    author: 'Author 3',
    title: 'News title 3',
    description: 'News desc 3',
    url: 'url 3',
    urlToImage: 'image url 3',
    publishedAt: 'date 3',
    content: 'news content 3',
  },
  {
    author: 'Author 4',
    title: 'News title 4',
    description: 'News desc 4',
    url: 'url 4',
    urlToImage: 'image url 4',
    publishedAt: 'date 4',
    content: 'news content 4',
  },
  {
    author: 'Author 5',
    title: 'News title 5',
    description: 'News desc 5',
    url: 'url 5',
    urlToImage: 'image url 5',
    publishedAt: 'date 5',
    content: 'news content 5',
  },
  {
    author: 'Author 6',
    title: 'News title 6',
    description: 'News desc 6',
    url: 'url 6',
    urlToImage: 'image url 6',
    publishedAt: 'date 6',
    content: 'news content 6',
  },
  {
    author: 'Author 7 ',
    title: 'News title 7',
    description: 'News desc 7',
    url: 'url 7',
    urlToImage: 'image url 7',
    publishedAt: 'date 7',
    content: 'news content 7',
  },
  {
    author: 'Author 8',
    title: 'News title 8',
    description: 'News desc 8',
    url: 'url 8',
    urlToImage: 'image url 8',
    publishedAt: 'date 8',
    content: 'news content 8',
  },
  {
    author: 'Author 9',
    title: 'News title 9',
    description: 'News desc 9',
    url: 'url 9',
    urlToImage: 'image url 9',
    publishedAt: 'date 9',
    content: 'news content 9',
  },
  {
    author: 'Author 10',
    title: 'News title 10',
    description: 'News desc 10',
    url: 'url 10',
    urlToImage: 'image url 10',
    publishedAt: 'date 10',
    content: 'news content 10',
  },
];

describe('Testing newsfeed', () => {
  test('page contains the header and 10 items', async () => {
    const store = mockStore({
      getNewsReducer: {
        news: mockData,
      },
    });
    const component = (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );

    const {findByText, findAllByText, getByTestId} = render(component);

    const header = await findByText('News');
    const items = await findAllByText(/News title/);

    expect(header).toBeTruthy();
    expect(items.length).toBe(10);

    //test list news scroll to end
    const eventData = {
      nativeEvent: {
        contentOffset: {
          y: 500,
        },
        contentSize: {
          height: 100,
          width: 100,
        },
        layoutMeasurement: {
          height: 960,
          width: 540,
        },
      },
    };
    const onEndReached = jest.fn();
    fireEvent.scroll(getByTestId('flat-list'), eventData);
    expect(onEndReached).toHaveBeenCalled();
  });

  test('clicking on one item takes you to the details screen', async () => {
    const store = mockStore({
      getNewsReducer: {
        news: mockData,
      },
    });
    const component = (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );

    const {findByText} = render(component);
    const toClick = await findByText('News title 5');

    fireEvent(toClick, 'press');
    const newHeader = await findByText('Showing details for 5');
    const newBody = await findByText('the number you have chosen is 5');

    expect(newHeader).toBeTruthy();
    expect(newBody).toBeTruthy();
  });
});
