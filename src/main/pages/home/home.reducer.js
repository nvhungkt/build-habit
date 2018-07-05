import { LOAD_HABITS_SUCCESS, LOAD_NOTIFICATIONS_SUCCESS } from './home.action';

const initialState = {
  habits: [],
  notifications: []
};

const setHabits = (state, payload) => {
  if (payload) {
    state.habits = payload;
  }

  return { ...state };
};

const setNotifications = (state, payload) => {
  if (payload) {
    state.notifications = payload;
  }

  return { ...state };
};

export const homeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_HABITS_SUCCESS:
      return setHabits(state, payload);
    case LOAD_NOTIFICATIONS_SUCCESS:
      return setNotifications(state, payload);
    // Default case to keep current state
    default:
      return state;
  }
};
