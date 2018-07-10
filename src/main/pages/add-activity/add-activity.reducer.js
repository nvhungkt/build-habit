import {
  GET_TEMPLATES_SUCCESS
} from './add-activity.action';

const initialState = {
  tags: []
};

const addTags = (state, payload) => ({
  ...state,
  tags: payload
});

export const addActivityReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TEMPLATES_SUCCESS:
      return addTags(state, payload);
    // Default case to keep current state
    default:
      return state;
  }
};
