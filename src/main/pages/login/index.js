import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { LOGIN_STORE } from '../../constant/store';

import Login from './login.component';
import { login } from './login.action';

const getLoginToken = state => state[LOGIN_STORE].token;
const getLoginUsername = state => state[LOGIN_STORE].username;

const loginSelector = createSelector(
  getLoginToken,
  getLoginUsername,
  (token, username) => ({
    token: token || null,
    username: username || null
  })
);

export default connect(loginSelector, { login })(Login);
