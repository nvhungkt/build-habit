import React from 'react';
import { Content, Button, Text } from 'native-base';

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
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add new habit',
      headerTitleStyle: { alignSelf: 'center' },
      headerRight: (
        <Button transparent onPress={() => navigation.push('AddActivityDetail')}>
          <Text style={{ color: '#e91e63' }}>CREATE</Text>
        </Button>
      )
    };
  }

  render() {
    return (
      <React.Fragment>
        <Content>
          {tags.map((tag, index) => <HabitTag key={index} name={tag.name} habits={tag.habits} />)}
        </Content>
      </React.Fragment>
    );
  }
}
