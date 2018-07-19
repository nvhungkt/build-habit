import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_ERROR
} from './login.action';

const initialState = {
  token: null,
  username: null,
  password: null
};

const loginSuccess = (state, payload, additional) => {
  return {
    ...state,
    token: payload,
    username: additional.username
  };
};

const loginFailure = state => {
  // eslint-disable-next-line
  alert('Invalid username or password. Please try again!');

  return state;
};

const loginError = state => {
  // eslint-disable-next-line
  alert('An error has occured, Please try again!');

  return state;
};

const signUpSuccess = (state, additional) => {
  return {
    ...state,
    username: additional.username,
    password: additional.password
  };
};

const signUpFailure = state => {
  // eslint-disable-next-line
  alert('Duplicate username, please choose another one!');

  return state;
};

const signUpError = state => {
  // eslint-disable-next-line
  alert('An error has occured, Please try again!');

  return state;
};

export const loginReducer = (state = initialState, { type, payload, additional }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return loginSuccess(state, payload, additional);
    case LOGIN_FAILURE:
      return loginFailure(state);
    case LOGIN_ERROR:
      return loginError(state);
    case SIGN_UP_SUCCESS:
      return signUpSuccess(state, additional);
    case SIGN_UP_FAILURE:
      return signUpFailure(state);
    case SIGN_UP_ERROR:
      return signUpError(state);
    // Default case to keep current state
    default:
      return state;
  }
};
