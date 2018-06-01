import React from 'react';
import { Provider } from 'react-redux';
import { NativeRouter } from 'react-router-native';
import { Root } from 'native-base';
import { Font, AppLoading } from 'expo';

import { store } from '../store';

import App from "./app.component";

const appStore = store.configureStore();

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Pacifico: require("./assets/font/Pacifico.ttf"),
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
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
