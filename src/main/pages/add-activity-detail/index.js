import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { ADD_ACTIVITY_DETAIL_STORE } from '../../constant/store';

import AddActivityDetail from './add-activity-detail.component';
import { addNewHabit } from './add-activity-detail.action';

const getActivityStatus = state => state[ADD_ACTIVITY_DETAIL_STORE].activityStatus;

const addActivitySelector = createSelector(
  getActivityStatus,
  activityStatus => ({ activityStatus: activityStatus || '' })
);

export default connect(addActivitySelector, { addNewHabit })(AddActivityDetail);
