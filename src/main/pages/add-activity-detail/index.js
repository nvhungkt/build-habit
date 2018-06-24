import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { ADD_ACTIVITY_DETAIL_STORE } from '../../constant/store';

import AddActivityDetail from './add-activity-detail.component';
import { addNewHabit, resetStatus } from './add-activity-detail.action';

const getActivityStatus = state => state[ADD_ACTIVITY_DETAIL_STORE].activityStatus;
const getSuccessStatus = state => state[ADD_ACTIVITY_DETAIL_STORE].success;

const addActivitySelector = createSelector(
  getActivityStatus,
  getSuccessStatus,
  (activityStatus, success) => ({ activityStatus: activityStatus || '', success })
);

export default connect(addActivitySelector, { addNewHabit, resetStatus })(AddActivityDetail);
