import React from 'react';
import { View, Image } from 'react-native';
import { Text, Icon, Button } from 'native-base';

import icons from '../../../../assets/icon-index';

import { styles } from './habit-template.style';

export default class HabitTemplate extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {this.props.icon && <Image style={styles.icon} source={icons[this.props.icon]} resizeMode='contain' />}
          <View style={styles.habit}>
            <Text>{this.props.title}</Text>
          </View>
          <View style={styles.action}>
            <Button transparent>
              <Icon style={{ color: 'black' }} name="md-add" />
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
