import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text } from 'native-base';
import { createStackNavigator } from 'react-navigation';

import { store } from '../store';
import {
  LOGIN_STORE,
  HOME_STORE,
  NOTIFICATIONS_STORE,
  DETAIL_STORE,
  ADD_ACTIVITY_DETAIL_STORE,
  ADD_ACTIVITY_STORE
} from './constant/store';
import { getToken } from './sqlite/token.storage';

import Login from './pages/login';
import Home from './pages/home';
import Detail from './pages/detail';
import Notifications from './pages/notifications';
import AddActivity from './pages/add-activity';
import AddActivityDetail from './pages/add-activity-detail';
import Explore from './pages/explore';
import ExploreDetail from './pages/explore-detail';

import { loginReducer } from './pages/login/login.reducer';
import { homeReducer } from './pages/home/home.reducer';
import { notificationsReducer } from './pages/notifications/notifications.reducer';
import { detailReducer } from './pages/detail/detail.reducer';
import { addActivityDetailReducer } from './pages/add-activity-detail/add-activity-detail.reducer';
import { addActivityReducer } from './pages/add-activity/add-activity.reducer';

const createRootStack = inititalPage => createStackNavigator(
  {
    Login: {
      screen: Login
    },
    Home: {
      screen: Home
    },
    Notifications: {
      screen: Notifications
    },
    Detail: {
      screen: Detail
    },
    AddActivity: {
      screen: AddActivity
    },
    AddActivityDetail: {
      screen: AddActivityDetail
    },
    Explore: {
      screen: Explore
    },
    ExploreDetail: {
      screen: ExploreDetail
    }
  },
  {
    initialRouteName: inititalPage
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
    store.injectReducer(LOGIN_STORE, loginReducer);
    store.injectReducer(HOME_STORE, homeReducer);
    store.injectReducer(NOTIFICATIONS_STORE, notificationsReducer);
    store.injectReducer(DETAIL_STORE, detailReducer);
    store.injectReducer(ADD_ACTIVITY_DETAIL_STORE, addActivityDetailReducer);
    store.injectReducer(ADD_ACTIVITY_STORE, addActivityReducer);

    this.state = {
      loaded: false,
      inititalPage: ""
    };
  }

  componentDidMount() {
    this.getToken();
  }

  getToken = async () => {
    this.token = await getToken();
    if (this.token.token) {
      this.setState({ loaded: true, inititalPage: "Home" });
    } else {
      this.setState({ loaded: true, inititalPage: "Login" });
    }
  }

  render() {
    const RootStack = createRootStack(this.state.inititalPage);

    return (
      <Container style={styles.container} theme={theme}>
        {
          this.state.loaded ? <RootStack /> : <Text>Loading ...</Text>
        }
      </Container>
    );
  }
}
