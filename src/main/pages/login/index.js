import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { LOGIN_STORE } from '../../constant/store';

import Login from './login.component';
import { login, signUp } from './login.action';

const getLoginToken = state => state[LOGIN_STORE].token;
const getLoginUsername = state => state[LOGIN_STORE].username;
const getLoginPassword = state => state[LOGIN_STORE].password;

const loginSelector = createSelector(
  getLoginToken,
  getLoginUsername,
  getLoginPassword,
  (token, username, password) => ({
    token: token || null,
    username: username || null,
    password: password || null
  })
);

export default connect(loginSelector, { login, signUp })(Login);
