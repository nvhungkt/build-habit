import React from 'react';
import { View, Image } from 'react-native';
import { Icon, Text } from 'native-base';

import { styles, textStyles } from './todo.style';

export default class Todo extends React.Component {
  render() {
    const { todo, times, status, icon } = this.props;
    const done = status === 'Done';

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {icon && <Image style={styles.icon} source={icon} resizeMode='contain'/>}
          <View style={styles.todo}>
            <Text style={textStyles(done).todo}>{todo}</Text>
            <Text style={textStyles(done).times}>{times}</Text>
          </View>
          <View style={styles.status}>
            <Icon style={textStyles(done).status} name="md-checkmark" />
          </View>
        </View>
      </View>
    );
  }
}
