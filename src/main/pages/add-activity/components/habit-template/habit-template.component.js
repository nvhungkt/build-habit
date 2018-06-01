import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon, Button } from 'native-base';

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  content: {
    flex: 1,
    flexDirection: 'row'
  },
  habit: {
    flex: 7,
    alignSelf: 'center'
  },
  action: {
    flex: 1,
    alignSelf: 'center'
  }
});

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
