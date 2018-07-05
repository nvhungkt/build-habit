import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { HOME_STORE, ADD_ACTIVITY_DETAIL_STORE } from '../../constant/store';

import Home from './home.component';
import { loadHabits, loadNotifications } from './home.action';
import { resetStatus } from '../add-activity-detail/add-activity-detail.action';

const getHabits = state => state[HOME_STORE].habits;
const getNotifications = state => state[HOME_STORE].notifications;
const getActivityStatus = state => state[ADD_ACTIVITY_DETAIL_STORE].activityStatus;
const getSuccessStatus = state => state[ADD_ACTIVITY_DETAIL_STORE].success;

const homeSelector = createSelector(
  getHabits,
  getNotifications,
  getActivityStatus,
  getSuccessStatus,
  // eslint-disable-next-line
  (habits, notifications, activityStatus, success) => ({
    habits: habits || [],
    notifications: notifications || [],
    activityStatus: activityStatus || '',
    success
  })
);

export default connect(homeSelector, { loadHabits, loadNotifications, resetStatus })(Home);
