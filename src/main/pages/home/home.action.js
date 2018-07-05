import { API_REQUEST } from '../../utils/api-middleware';

import { getByDate, getByDateOffset } from '../../constant/api/habit.api';
import { getOffsetMillis } from '../../utils/time';

export const LOAD_HABITS_SUCCESS = 'LOAD_HABITS_SUCCESS';
export const LOAD_HABITS_FAILURE = 'LOAD_HABITS_FAILURE';
export const LOAD_HABITS_ERROR = 'LOAD_HABITS_ERROR';
export const LOAD_NOTIFICATIONS_SUCCESS = 'LOAD_NOTIFICATIONS_SUCCESS';
export const LOAD_NOTIFICATIONS_FAILURE = 'LOAD_NOTIFICATIONS_FAILURE';
export const LOAD_NOTIFICATIONS_ERROR = 'LOAD_NOTIFICATIONS_ERROR';

const getHabits = (fromDate, toDate) => {
  return {
    [API_REQUEST]: {
      url: `${getByDate}?username=hungnv&from=${fromDate}&to=${toDate}&offsetMillis=${getOffsetMillis()}`,
      method: 'GET',
      action: {
        success: LOAD_HABITS_SUCCESS,
        failure: LOAD_HABITS_FAILURE,
        error: LOAD_HABITS_ERROR
      }
    }
  };
};

const getNotifications = (dateRange, mode) => {
  return {
    [API_REQUEST]: {
      url: `${getByDateOffset}?username=hungnv&mode=${mode}&dateOffset=${dateRange}&offsetMillis=${getOffsetMillis()}`,
      method: 'GET',
      action: {
        success: LOAD_NOTIFICATIONS_SUCCESS,
        failure: LOAD_NOTIFICATIONS_FAILURE,
        error: LOAD_NOTIFICATIONS_ERROR
      }
    }
  };
};

export const loadHabits = (fromDate, toDate) => {
  return getHabits(fromDate, toDate);
};

export const loadNotifications = () => {
  const dateRange = 1;

  return getNotifications(dateRange, 'future');
};
