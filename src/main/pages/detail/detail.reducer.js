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
    // Default case to keep current state
    default:
      return state;
  }
};
