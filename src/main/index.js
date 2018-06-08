import React from 'react';
import { Provider } from 'react-redux';
import { NativeRouter } from 'react-router-native';
import { Root } from 'native-base';

import { store } from '../store';

import App from "./app.component";

const appStore = store.configureStore();

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  render() {
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
