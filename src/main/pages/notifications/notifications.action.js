import { API_REQUEST } from '../../utils/api-middleware';

import { getByDateOffset } from '../../constant/api/habit.api';
import { getOffsetMillis } from '../../utils/time';

export const LOAD_NOTIFICATION_PAGE_SUCCESS = 'LOAD_NOTIFICATION_PAGE_SUCCESS';
export const LOAD_NOTIFICATION_PAGE_FAILURE = 'LOAD_NOTIFICATION_PAGE_FAILURE';
export const LOAD_NOTIFICATION_PAGE_ERROR = 'LOAD_NOTIFICATION_PAGE_ERROR';

const getNotifications = (dateRange, mode) => {
  return {
    [API_REQUEST]: {
      url: `${getByDateOffset}?username=hungnv&mode=${mode}&dateOffset=${dateRange}&offsetMillis=${getOffsetMillis()}`,
      method: 'GET',
      action: {
        success: LOAD_NOTIFICATION_PAGE_SUCCESS,
        failure: LOAD_NOTIFICATION_PAGE_FAILURE,
        error: LOAD_NOTIFICATION_PAGE_ERROR
      }
    }
  };
};

export const loadNotifications = () => {
  const dateRange = 3;

  return getNotifications(dateRange, 'past');
};
