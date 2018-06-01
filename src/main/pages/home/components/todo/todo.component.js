import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  content: {
    flex: 1,
    flexDirection: 'row'
  },
  todo: {
    flex: 8,
    alignSelf: 'center'
  },
  status: {
    flex: 2,
    alignItems: 'center',
    alignSelf: 'center'
  }
});

const textStyles = StyleSheet.create({
  todo: {
    color: '#424242',
    fontSize: 20,
    fontWeight: 'bold'
  },
  times: {
    color: '#424242',
    fontSize: 20
  },
  statusDone: {
    color: '#64dd17',
    fontSize: 20,
    fontWeight: 'bold'
  },
  statusNotDone: {
    color: '#424242',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default class Todo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.todo}>
            <Text style={textStyles.todo}>{this.props.todo}</Text>
            <Text style={textStyles.times}>{this.props.times}</Text>
          </View>
          <View style={styles.status}>
            <Text style={
              this.props.status === 'Done' ?
              textStyles.statusDone :
              textStyles.statusNotDone
              }
            >
              {this.props.status}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
