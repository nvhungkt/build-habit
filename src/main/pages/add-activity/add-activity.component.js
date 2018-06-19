import React from 'react';
import { Content, Button, Text } from 'native-base';

import HabitTag from './components/habit-tag';

import { styles, textStyles } from './add-activity.style';

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
      headerTitleStyle: styles.title,
      headerRight: (
        <Button transparent onPress={() => navigation.push('AddActivityDetail')}>
          <Text style={textStyles.themeText}>CREATE</Text>
        </Button>
      )
    };
  }

  render() {
    return (
      <Content style={styles.container}>
        {tags.map((tag, index) => <HabitTag key={index} name={tag.name} habits={tag.habits} />)}
      </Content>
    );
  }
}
