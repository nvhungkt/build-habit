import { API_REQUEST } from '../../utils/api-middleware';

import { addHabit as addHabitAPI } from '../../constant/api/habit.api';

export const ADD_NEW_HABIT_SUCCESS = 'ADD_NEW_HABIT_SUCCESS';
export const ADD_NEW_HABIT_FAILURE = 'ADD_NEW_HABIT_FAILURE';
export const ADD_NEW_HABIT_ERROR = 'ADD_NEW_HABIT_ERROR';
export const RESET_ADD_ACTIVITY_STATUS = 'RESET_ADD_ACTIVITY_STATUS';

const username = 'nambm';

const addHabit = ({ title, description, icon, schedule, tags }) => {
  return {
    [API_REQUEST]: {
      url: addHabitAPI,
      method: 'POST',
      body: {
        username,
        title,
        description,
        icon,
        schedule,
        tags
      },
      action: {
        success: ADD_NEW_HABIT_SUCCESS,
        failure: ADD_NEW_HABIT_FAILURE,
        error: ADD_NEW_HABIT_ERROR
      }
    }
  };
};

export const addNewHabit = ({ title, description, icon, schedule, tags }) => {
  return addHabit({ title, description, icon, schedule, tags });
};

export const resetStatus = () => ({
  type: RESET_ADD_ACTIVITY_STATUS
});
