import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { HOME_STORE } from '../../constant/store';

import Home from './home.component';
import { loadHabits } from './home.action';
import { loadHabitDetail } from '../detail/detail.action';

const getHabits = state => state[HOME_STORE].habits;

const homeSelector = createSelector(
  getHabits,
  (habits) => ({ habits: habits || [] })
);

export default connect(homeSelector, { loadHabits, loadHabitDetail })(Home);
