import React from 'react';
import { Text, View } from 'react-native';

import { styles, textStyles } from './todo.style';

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
