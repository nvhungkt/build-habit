import { API_REQUEST } from '../../utils/api-middleware';

import { getHabitTemplates } from '../../constant/api/habit.api';

export const GET_TEMPLATES_SUCCESS = 'GET_TEMPLATES_SUCCESS';
export const GET_TEMPLATES_FAILURE = 'GET_TEMPLATES_FAILURE';
export const GET_TEMPLATES_ERROR = 'GET_TEMPLATES_ERROR';

const getTemplates = () => {
  return {
    [API_REQUEST]: {
      url: getHabitTemplates,
      method: 'GET',
      action: {
        success: GET_TEMPLATES_SUCCESS,
        failure: GET_TEMPLATES_FAILURE,
        error: GET_TEMPLATES_ERROR
      }
    }
  };
};

export const getAllTemplatesByTags = () => {
  return getTemplates();
};
