import React from 'react';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';
import { createStackNavigator } from 'react-navigation';

import { store } from '../store';
import { HOME_STORE, DETAIL_STORE, ADD_ACTIVITY_DETAIL_STORE } from './constant/store';

import Home from './pages/home';
import Detail from './pages/detail';
import AddActivity from './pages/add-activity';
import AddActivityDetail from './pages/add-activity-detail';

import { homeReducer } from './pages/home/home.reducer';
import { detailReducer } from './pages/detail/detail.reducer';
import { addActivityDetailReducer } from './pages/add-activity-detail/add-activity-detail.reducer';

const RootStack = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Detail: {
      screen: Detail
    },
    AddActivity: {
      screen: AddActivity
    },
    AddActivityDetail: {
      screen: AddActivityDetail
    }
  },
  {
    initialRouteName: 'Home'
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  }
});

const theme = {
  toolbarTextColor: '#000'
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    store.injectReducer(HOME_STORE, homeReducer);
    store.injectReducer(DETAIL_STORE, detailReducer);
    store.injectReducer(ADD_ACTIVITY_DETAIL_STORE, addActivityDetailReducer);
  }
  render() {
    return (
      <Container style={styles.container} theme={theme}>
        <RootStack />
      </Container>
    );
  }
}
