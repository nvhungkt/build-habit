import {
  ADD_NEW_HABIT_SUCCESS,
  ADD_NEW_HABIT_FAILURE,
  ADD_NEW_HABIT_ERROR,
  RESET_ADD_ACTIVITY_STATUS
} from './add-activity-detail.action';

const initialState = {
  activityStatus: '',
  success: null
};

const addSuccess = state => ({
  ...state,
  activityStatus: 'Add habit successfully!',
  success: true
});

const addFailure = state => ({
  ...state,
  activityStatus: 'Network error. Please try again!',
  success: false
});

const addError = state => ({
  ...state,
  activityStatus: 'An error has occured, Please try again!',
  success: false
});

const reset = () => ({
  activityStatus: '',
  success: null
});

export const addActivityDetailReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_NEW_HABIT_SUCCESS:
      return addSuccess(state);
    case ADD_NEW_HABIT_FAILURE:
      return addFailure(state, payload);
    case ADD_NEW_HABIT_ERROR:
      return addError(state, payload);
    case RESET_ADD_ACTIVITY_STATUS:
      return reset();
    // Default case to keep current state
    default:
      return state;
  }
};
