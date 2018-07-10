import { LOAD_NOTIFICATION_PAGE_SUCCESS } from './notifications.action';

const initialState = {
  notifications: []
};

const setNotifications = (state, payload) => {
  if (payload) {
    state.notifications = payload;
  }

  return { ...state };
};

export const notificationsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_NOTIFICATION_PAGE_SUCCESS:
      return setNotifications(state, payload);
    // Default case to keep current state
    default:
      return state;
  }
};
