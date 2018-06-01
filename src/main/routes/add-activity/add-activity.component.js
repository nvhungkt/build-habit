import React from 'react';
import { View } from 'react-native';
import { Button, Content } from 'native-base';

import NavigationBar from './components/navigation-bar';
import HabitTag from './components/habit-tag';

const tags = [
  {
    name: 'Health',
    habits: [
      {
        name: 'Do exercies'
      },
      {
        name: 'Have fruits before meal'
      },
      {
        name: 'Go to bed early'
      }
    ]
  },
  {
    name: 'Study',
    habits: [
      {
        name: 'Read books'
      },
      {
        name: 'Learn English'
      },
      {
        name: 'Listen to records'
      },
      {
        name: 'Practice with homeworks'
      }
    ]
  },
  {
    name: 'Work',
    habits: [
      {
        name: 'Pomodoro Technique'
      },
      {
        name: 'Listen to music'
      },
      {
        name: 'Meet up with other people'
      }
    ]
  }
];

export default class AddActivity extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <Content>
          {tags.map((tag, index) => <HabitTag key={index} name={tag.name} habits={tag.habits} />)}
        </Content>
      </React.Fragment>
    );
  }
}
