import React from 'react';
import { Content, Button, Text } from 'native-base';

import HabitTag from './components/habit-tag';

import { styles, textStyles } from './add-activity.style';

const tags = [
  {
    name: 'Health',
    habits: [
      {
        title: 'Do exercies',
        icon: 'dumbbell-single'
      },
      {
        title: 'Have fruits before meal',
        icon: 'avocado'
      },
      {
        title: 'Go to bed early',
        icon: 'bed'
      }
    ]
  },
  {
    name: 'Study',
    habits: [
      {
        title: 'Read books',
        icon: 'news'
      },
      {
        title: 'Learn English',
        icon: 'check-list'
      },
      {
        title: 'Listen to records',
        icon: 'radio'
      },
      {
        title: 'Practice with homeworks',
        icon: 'healthcare-heart'
      }
    ]
  },
  {
    name: 'Work',
    habits: [
      {
        title: 'Pomodoro Technique',
        icon: 'tomato'
      },
      {
        title: 'Listen to music',
        icon: 'radio'
      },
      {
        title: 'Meet up with other people',
        icon: 'shirt'
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
