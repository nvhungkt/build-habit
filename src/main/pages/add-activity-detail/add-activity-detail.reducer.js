import { ADD_NEW_HABIT_SUCCESS, ADD_NEW_HABIT_FAILURE, ADD_NEW_HABIT_ERROR } from './add-activity-detail.action';

const initialState = {
  activityStatus: ''
};

const addSuccess = state => {
  return { ...state, activityStatus: 'Add habit successfully!' };
};

const addFailure = state => {
  return { ...state, activityStatus: 'Fail to add activity!' };
};

const addError = state => {
  return { ...state, activityStatus: 'An error occurred, please try again!' };
};

export const addActivityDetailReducer = (state = initialState, { type }) => {
  switch (type) {
    case ADD_NEW_HABIT_SUCCESS:
      return addSuccess(state);
    case ADD_NEW_HABIT_FAILURE:
      return addFailure(state);
    case ADD_NEW_HABIT_ERROR:
      return addError(state);
    // Default case to keep current state
    default:
      return state;
  }
};
