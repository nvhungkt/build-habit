import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_ERROR
} from './login.action';

const initialState = {
  token: null,
  username: null
};

const addSuccess = (state, payload, additional) => {
  return {
    ...state,
    token: payload,
    username: additional.username
  };
};

const addFailure = state => {
  // eslint-disable-next-line
  alert('Invalid username or password. Please try again!');

  return state;
};

const addError = state => {
  // eslint-disable-next-line
  alert('An error has occured, Please try again!');

  return state;
};

export const loginReducer = (state = initialState, { type, payload, additional }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return addSuccess(state, payload, additional);
    case LOGIN_FAILURE:
      return addFailure(state);
    case LOGIN_ERROR:
      return addError(state);
    // Default case to keep current state
    default:
      return state;
  }
};
