import React from 'react';
import { Text, View } from 'react-native';

import { styles, textStyles } from './todolist.style';

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
