import { API_REQUEST } from '../../utils/api-middleware';

import { getByDate, getByDateOffset as getNotif } from '../../constant/api/habit.api';
import { getOffsetMillis } from '../../utils/time';

export const LOAD_HABITS_SUCCESS = 'LOAD_HABITS_SUCCESS';
export const LOAD_HABITS_FAILURE = 'LOAD_HABITS_FAILURE';
export const LOAD_HABITS_ERROR = 'LOAD_HABITS_ERROR';
export const LOAD_NOTIFICATIONS_SUCCESS = 'LOAD_NOTIFICATIONS_SUCCESS';
export const LOAD_NOTIFICATIONS_FAILURE = 'LOAD_NOTIFICATIONS_FAILURE';
export const LOAD_NOTIFICATIONS_ERROR = 'LOAD_NOTIFICATIONS_ERROR';

const getHabits = (fromDate, toDate, { token, username }) => {
  return {
    [API_REQUEST]: {
      url: `${getByDate}?username=${username}&from=${fromDate}&to=${toDate}&offsetMillis=${getOffsetMillis()}`,
      headers: {
        Authorization: token
      },
      method: 'GET',
      action: {
        success: LOAD_HABITS_SUCCESS,
        failure: LOAD_HABITS_FAILURE,
        error: LOAD_HABITS_ERROR
      }
    }
  };
};

const getNotifications = (dateRange, mode, { token, username }) => {
  return {
    [API_REQUEST]: {
      url: `${getNotif}?username=${username}&mode=${mode}&dateOffset=${dateRange}&offsetMillis=${getOffsetMillis()}`,
      headers: {
        Authorization: token
      },
      method: 'GET',
      action: {
        success: LOAD_NOTIFICATIONS_SUCCESS,
        failure: LOAD_NOTIFICATIONS_FAILURE,
        error: LOAD_NOTIFICATIONS_ERROR
      }
    }
  };
};

export const loadHabits = (fromDate, toDate, { token, username }) => {
  return getHabits(fromDate, toDate, { token, username });
};

export const loadNotifications = ({ token, username }) => {
  const dateRange = 1;

  return getNotifications(dateRange, 'future', { token, username });
};
