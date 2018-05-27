import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Todo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.todo}>
            <Text>{this.props.todo}</Text>
            <Text>{this.props.times}</Text>
          </View>
          <View style={styles.status}>
            <Text>{this.props.status}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 120,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  todo: {
    flex: 8,
    alignSelf: 'center',
  },
  status: {
    flex: 2,
    alignItems: 'center',
    alignSelf: 'center'
  }
});
