// import { RSAA } from 'redux-api-middleware';
import { API_REQUEST } from 'redux-native-api-middleware';

import { getByDate } from '../../constant/api/habit.api';

export const LOAD_HABITS_SUCCESS = 'LOAD_HABITS_SUCCESS';
export const LOAD_HABITS_FAILURE = 'LOAD_HABITS_FAILURE';
export const LOAD_HABITS_ERROR = 'LOAD_HABITS_ERROR';

const getHabits = (fromDate, toDate) => {
  const data = new FormData();

  data.append('username', 'hungnv');
  data.append('from', fromDate);
  data.append('to', toDate);
  data.append('offsetMillis', '25200000');

  return {
    [API_REQUEST]: {
      url: `${getByDate}?username=hungnv&from=${fromDate}&to=${toDate}&offsetMillis=25200000`,
      method: 'GET',
      action: {
        success: LOAD_HABITS_SUCCESS,
        failure: LOAD_HABITS_FAILURE,
        error: LOAD_HABITS_ERROR
      }
    }
  };
};

export const loadHabits = (fromDate, toDate) => {
  return getHabits(fromDate, toDate);
};
