import { API_REQUEST } from '../../utils/api-middleware';

import { addHabit as addHabitAPI, updateHabit } from '../../constant/api/habit.api';

export const ADD_NEW_HABIT_SUCCESS = 'ADD_NEW_HABIT_SUCCESS';
export const ADD_NEW_HABIT_FAILURE = 'ADD_NEW_HABIT_FAILURE';
export const ADD_NEW_HABIT_ERROR = 'ADD_NEW_HABIT_ERROR';
export const RESET_ADD_ACTIVITY_STATUS = 'RESET_ADD_ACTIVITY_STATUS';

const postAddNewHabit = ({ id, title, description, icon, schedule, tags, editMode }, { token, username }) => {
  return {
    [API_REQUEST]: {
      url: editMode ? updateHabit : addHabitAPI,
      headers: {
        Authorization: token
      },
      method: editMode ? 'PUT' : 'POST',
      body: {
        username,
        id,
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

export const addNewHabit = ({ id, title, description, icon, schedule, tags, editMode }, { token, username }) => {
  return postAddNewHabit({ id, title, description, icon, schedule, tags, editMode }, { token, username });
};

export const resetStatus = () => ({
  type: RESET_ADD_ACTIVITY_STATUS
});
