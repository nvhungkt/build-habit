import React from 'react';
import { Provider } from 'react-redux';
import { NativeRouter } from 'react-router-native';
import { Root } from 'native-base';
import { Font, AppLoading, Permissions } from 'expo';

import Pacifico from "./assets/font/Pacifico.ttf";
import Roboto from "native-base/Fonts/Roboto.ttf";
import RobotoMedium from "native-base/Fonts/Roboto_medium.ttf";

import { store } from '../store';

import App from "./app.component";

const appStore = store.configureStore();

  // eslint-disable-next-line
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Pacifico,
      Roboto,
      // eslint-disable-next-line
      Roboto_medium: RobotoMedium
    });
    this.setState({ loading: false });

    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );

    if (existingStatus !== 'granted') {
      await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }

    return (
      <Root>
        <Provider store={appStore}>
          <NativeRouter>
            <App />
          </NativeRouter>
        </Provider>
      </Root>
    );
  }
}
