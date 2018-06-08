import React from 'react';
import { View } from 'react-native';
import { Text, Button, Icon } from 'native-base';

import { styles } from './habit-template.style';

export default class HabitTemplate extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.habit}>{this.props.name}</Text>
          <Button style={styles.action} transparent>
            <Icon style={{ color: 'black' }} name="md-add" />
          </Button>
        </View>
      </View>
    );
  }
}
