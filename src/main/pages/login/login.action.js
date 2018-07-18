import { API_REQUEST } from '../../utils/api-middleware';

import { login as loginApi } from '../../constant/api/habit.api';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_ERROR = 'LOGIN_ERROR';
// export const LOAD_NOTIFICATIONS_SUCCESS = 'LOAD_NOTIFICATIONS_SUCCESS';
// export const LOAD_NOTIFICATIONS_FAILURE = 'LOAD_NOTIFICATIONS_FAILURE';
// export const LOAD_NOTIFICATIONS_ERROR = 'LOAD_NOTIFICATIONS_ERROR';

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

export const login = (username, password) => doLogin(username, password);
