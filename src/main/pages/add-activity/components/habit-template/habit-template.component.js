import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text, Icon, Button } from 'native-base';

import icons from '../../../../assets/icon-index';

import { styles } from './habit-template.style';

export default class HabitTemplate extends React.Component {

  handleChooseTemplate = () => {
    this.props.navigation.push('AddActivityDetail', { template: this.props.habit });
  }

  render() {
    const { title, icon } = this.props.habit;

    return (
      <TouchableOpacity onPress={this.handleChooseTemplate} style={styles.container}>
        <View style={styles.content}>
          {icon && <Image style={styles.icon} source={icons[icon]} resizeMode='contain' />}
          <View style={styles.habit}>
            <Text>{title}</Text>
          </View>
          <View style={styles.action}>
            <Button onPress={this.handleChooseTemplate} transparent>
              <Icon style={{ color: 'black' }} name="md-add" />
            </Button>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
