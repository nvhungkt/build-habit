import { LOAD_HABIT_DETAIL_SUCCESS } from './detail.action';

const initialState = {
  habit: {}
};

const setHabitDetail = (state, payload) => {
  if (payload) {
    state.habit = payload;
  }

  return { ...state };
};

export const detailReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_HABIT_DETAIL_SUCCESS:
      return setHabitDetail(state, payload);
    // case CHECK_DONE_HABIT_SUCCESS:
    //   return state;
    // Default case to keep current state
    default:
      return state;
  }
};
