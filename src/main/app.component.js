import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container } from 'native-base';

import { renderRoutes } from './components/route';

import Home from './routes/home';
import AddActivity from './routes/add-activity';

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
    // preProcess: () => store.injectReducer(HOME_STORE, homeReducer)
  },
  {
    path: "/add-activity",
    exact: true,
    component: AddActivity
  }
];

export default class App extends React.Component {
  render() {
    return (
      <Container style={styles.container} theme={theme}>
        {renderRoutes(routes)}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 24,
    flex: 1
  }
});

const theme = {
  toolbarTextColor: '#000'
}
