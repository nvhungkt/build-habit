import { API_REQUEST } from '../../utils/api-middleware';

import { login as loginApi, signUp as signUpApi } from '../../constant/api/habit.api';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';

const doLogin = (username, password) => {
  return {
    [API_REQUEST]: {
      url: loginApi,
      method: 'POST',
      body: {
        username,
        password
      },
      additional: {
        username
      },
      action: {
        success: LOGIN_SUCCESS,
        failure: LOGIN_FAILURE,
        error: LOGIN_ERROR
      }
    }
  };
};

const doSignUp = ({ username, password, name, email }) => {
  return {
    [API_REQUEST]: {
      url: signUpApi,
      method: 'POST',
      body: {
        username,
        password,
        name,
        email
      },
      additional: {
        username,
        password
      },
      action: {
        success: SIGN_UP_SUCCESS,
        failure: SIGN_UP_FAILURE,
        error: SIGN_UP_ERROR
      }
    }
  };
};

export const login = (username, password) => doLogin(username, password);

export const signUp = ({ username, password, name, email }) => doSignUp({ username, password, name, email });
