import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { HOME_STORE, ADD_ACTIVITY_DETAIL_STORE } from '../../constant/store';

import Home from './home.component';
import { loadHabits } from './home.action';
import { loadHabitDetail } from '../detail/detail.action';
import { resetStatus } from '../add-activity-detail/add-activity-detail.action';

const getHabits = state => state[HOME_STORE].habits;
const getActivityStatus = state => state[ADD_ACTIVITY_DETAIL_STORE].activityStatus;
const getSuccessStatus = state => state[ADD_ACTIVITY_DETAIL_STORE].success;

const homeSelector = createSelector(
  getHabits,
  getActivityStatus,
  getSuccessStatus,
  (habits, activityStatus, success) => ({
    habits: habits || [],
    activityStatus: activityStatus || '',
    success
  })
);

export default connect(homeSelector, { loadHabits, loadHabitDetail, resetStatus })(Home);
