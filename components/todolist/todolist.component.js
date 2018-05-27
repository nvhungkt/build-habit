import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class TodoList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.name}</Text>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginBottom: 0
  }
});
