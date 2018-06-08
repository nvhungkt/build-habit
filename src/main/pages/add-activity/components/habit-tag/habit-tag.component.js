import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';

import HabitTemplate from '../habit-template';

import { styles, textStyles } from './habit-tag.style';

export default class HabitTag extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={textStyles.section}>{this.props.name}</Text>
        {this.props.habits.map((habit, index) => <HabitTemplate name={habit.name} key={index} />)}
      </View>
    );
  }
}
