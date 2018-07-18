import { API_REQUEST } from '../../utils/api-middleware';

import { getDetail, checkDoneHabit, unCheckDoneHabit } from '../../constant/api/habit.api';
import { getOffsetMillis } from '../../utils/time';

export const LOAD_HABIT_DETAIL_SUCCESS = 'LOAD_HABIT_DETAIL_SUCCESS';
export const LOAD_HABIT_DETAIL_FAILURE = 'LOAD_HABIT_DETAIL_FAILURE';
export const LOAD_HABIT_DETAIL_ERROR = 'LOAD_HABIT_DETAIL_ERROR';
export const CHECK_DONE_HABIT_SUCCESS = 'ADD_NEW_HABIT_SUCCESS';
export const CHECK_DONE_HABIT_FAILURE = 'ADD_NEW_HABIT_FAILURE';
export const CHECK_DONE_HABIT_ERROR = 'ADD_NEW_HABIT_ERROR';

const getHabitDetail = (id, { token, username }) => {
  return {
    [API_REQUEST]: {
      url: `${getDetail}?username=${username}&habitId=${id}&offsetMillis=${getOffsetMillis()}`,
      headers: {
        Authorization: token
      },
      method: 'GET',
      action: {
        success: LOAD_HABIT_DETAIL_SUCCESS,
        failure: LOAD_HABIT_DETAIL_FAILURE,
        error: LOAD_HABIT_DETAIL_ERROR
      }
    }
  };
};

const putDoneHabit = (id, time, { token, username }) => {
  return {
    [API_REQUEST]: {
      url: checkDoneHabit,
      headers: {
        Authorization: token
      },
      method: 'PUT',
      body: {
        time,
        habitId: id,
        username,
        offsetMillis: getOffsetMillis()
      },
      action: {
        success: CHECK_DONE_HABIT_SUCCESS,
        failure: CHECK_DONE_HABIT_FAILURE,
        error: CHECK_DONE_HABIT_ERROR
      }
    }
  };
};

const putUndoneHabit = (id, time, { token, username }) => {
  return {
    [API_REQUEST]: {
      url: unCheckDoneHabit,
      headers: {
        Authorization: token
      },
      method: 'PUT',
      body: {
        time,
        habitId: id,
        username,
        offsetMillis: getOffsetMillis()
      },
      action: {
        success: CHECK_DONE_HABIT_SUCCESS,
        failure: CHECK_DONE_HABIT_FAILURE,
        error: CHECK_DONE_HABIT_ERROR
      }
    }
  };
};

export const loadHabitDetail = (id, { token, username }) => {
  return getHabitDetail(id, { token, username });
};

export const checkDone = (id, time, { token, username }) => {
  return putDoneHabit(id, time, { token, username });
};

export const checkUndone = (id, time, { token, username }) => {
  return putUndoneHabit(id, time, { token, username });
};
