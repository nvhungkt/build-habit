import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { DETAIL_STORE } from '../../constant/store';

import Detail from './detail.component';

const getHabitDetail = state => state[DETAIL_STORE].habit;

const detailSelector = createSelector(
  getHabitDetail,
  (habit) => ({ habit: habit || {} })
);

export default connect(detailSelector, { })(Detail);
