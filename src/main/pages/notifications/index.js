import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { NOTIFICATIONS_STORE, ADD_ACTIVITY_DETAIL_STORE } from '../../constant/store';

import Notifications from './notifications.component';
import { loadNotifications } from './notifications.action';

const getNotifications = state => state[NOTIFICATIONS_STORE].notifications;
const getSuccessStatus = state => state[ADD_ACTIVITY_DETAIL_STORE].success;

const notificationsSelector = createSelector(
  getNotifications,
  getSuccessStatus,
  (notifications, success) => ({
    notifications: notifications || [],
    success
  })
);

export default connect(notificationsSelector, { loadNotifications })(Notifications);
