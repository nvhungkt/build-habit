import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { ADD_ACTIVITY_STORE } from '../../constant/store';

import AddActivity from './add-activity.component';
import { getAllTemplatesByTags } from './add-activity.action';

const getTags = state => state[ADD_ACTIVITY_STORE].tags;

const addActivitySelector = createSelector(
  getTags,
  tags => ({ tags: tags || [] })
);

export default connect(addActivitySelector, { getAllTemplatesByTags })(AddActivity);
