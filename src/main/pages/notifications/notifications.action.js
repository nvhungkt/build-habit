import { API_REQUEST } from '../../utils/api-middleware';

import { getByDateOffset as getNotif } from '../../constant/api/habit.api';
import { getOffsetMillis } from '../../utils/time';

export const LOAD_NOTIFICATION_PAGE_SUCCESS = 'LOAD_NOTIFICATION_PAGE_SUCCESS';
export const LOAD_NOTIFICATION_PAGE_FAILURE = 'LOAD_NOTIFICATION_PAGE_FAILURE';
export const LOAD_NOTIFICATION_PAGE_ERROR = 'LOAD_NOTIFICATION_PAGE_ERROR';

const getNotifications = (dateRange, mode, { token, username }) => {
  return {
    [API_REQUEST]: {
      url: `${getNotif}?username=${username}&mode=${mode}&dateOffset=${dateRange}&offsetMillis=${getOffsetMillis()}`,
      headers: {
        Authorization: token
      },
      method: 'GET',
      action: {
        success: LOAD_NOTIFICATION_PAGE_SUCCESS,
        failure: LOAD_NOTIFICATION_PAGE_FAILURE,
        error: LOAD_NOTIFICATION_PAGE_ERROR
      }
    }
  };
};

export const loadNotifications = ({ token, username }) => {
  const dateRange = 3;

  return getNotifications(dateRange, 'past', { token, username });
};
