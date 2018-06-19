import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Icon, Text } from 'native-base';

import { styles, textStyles } from './todo.style';

export default class Todo extends React.Component {

  onChooseDetail = () => {
    const { loadHabitDetail, navigation, habitId } = this.props;

    loadHabitDetail(habitId);
    navigation.push('Detail');
  };

  render() {
    const { todo, times, done, icon } = this.props;

    return (
      <TouchableOpacity style={styles.container} onPress={this.onChooseDetail}>
        <View style={styles.content}>
          {icon && <Image style={styles.icon} source={icon} resizeMode='contain' />}
          <View style={styles.todo}>
            <Text style={textStyles(done).todo}>{todo}</Text>
            <Text style={textStyles(done).times}>{times}</Text>
          </View>
          <View style={styles.status}>
            <Icon style={textStyles(done).status} name="md-checkmark" />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
