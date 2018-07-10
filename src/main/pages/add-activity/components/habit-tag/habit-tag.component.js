import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';

import HabitTemplate from '../habit-template';

import { styles, textStyles } from './habit-tag.style';

export default class HabitTag extends React.Component {
  render() {
    const { habits = [], name, navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text style={textStyles.section}>{name}</Text>
        {habits.map((habit, index) =>
          <HabitTemplate navigation={navigation} habit={habit} key={index} />
        )}
      </View>
    );
  }
}
