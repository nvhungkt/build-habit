import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';

import HabitTemplate from '../habit-template';

const styles = StyleSheet.create({
  container: {
    margin: 20
  }
});

const textStyles = StyleSheet.create({
  section: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

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
