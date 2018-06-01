import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class TodoList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={textStyles.section}>{this.props.name}</Text>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20
  }
});

const textStyles = StyleSheet.create({
  section: {
    fontSize: 22,
    fontWeight: 'bold'
  }
});
