import React from 'react';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';
import { createStackNavigator } from 'react-navigation';

import { store } from '../store';

import Home from './pages/home';
import AddActivity from './pages/add-activity';
import AddActivityDetail from './pages/add-activity-detail';

import { homeReducer } from './pages/home/home.reducer';

const HOME_STORE = 'HOME_STORE';

const RootStack = createStackNavigator(
  {
    Home: {
      screen: Home
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
  }
  render() {
    return (
      <Container style={styles.container} theme={theme}>
        <RootStack />
      </Container>
    );
  }
}
