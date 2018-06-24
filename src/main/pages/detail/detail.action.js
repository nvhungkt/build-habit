import { API_REQUEST } from '../../utils/api-middleware';

import { getDetail } from '../../constant/api/habit.api';

export const LOAD_HABIT_DETAIL_SUCCESS = 'LOAD_HABIT_DETAIL_SUCCESS';
export const LOAD_HABIT_DETAIL_FAILURE = 'LOAD_HABIT_DETAIL_FAILURE';
export const LOAD_HABIT_DETAIL_ERROR = 'LOAD_HABIT_DETAIL_ERROR';

const getHabitDetail = (id) => {
  return {
    [API_REQUEST]: {
      url: `${getDetail}?username=hungnv&habitId=${id}`,
      method: 'GET',
      action: {
        success: LOAD_HABIT_DETAIL_SUCCESS,
        failure: LOAD_HABIT_DETAIL_FAILURE,
        error: LOAD_HABIT_DETAIL_ERROR
      }
    }
  };
};

export const loadHabitDetail = (id) => {
  return getHabitDetail(id);
};
