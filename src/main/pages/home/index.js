import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Home from './home.component';
import { loadHabits } from './home.action';

const HOME_STORE = 'HOME_STORE';

const getHabits = state => state[HOME_STORE].habits;

const homeSelector = createSelector(
  getHabits,
  (habits) => ({ habits: habits || [] })
);

export default connect(homeSelector, { loadHabits })(Home);
