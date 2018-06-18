import { LOAD_HABITS_SUCCESS } from './home.action';

const initialState = {
  habits: []
};

const setHabits = (state, payload) => {
  if (payload) {
    state.habits = payload;
  }

  return { ...state };
};

export const homeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_HABITS_SUCCESS:
      return setHabits(state, payload);
    // Default case to keep current state
    default:
      return state;
  }
};
