import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import { Text } from 'native-base';

import icons from '../../../../../../assets/icon-index';
import levels from '../../../../../../assets/level-index';

import { styles, textStyles } from './habit.style';

export default class Habit extends React.Component {
  render() {
    const { navigation, habit } = this.props;
    const { icon, name, level, description } = habit;

    return (
      <TouchableOpacity style={styles.container} onPress={() => navigation.push('ExploreDetail', { habit })}>
        <Image style={styles.icon} source={icons[icon]} resizeMode='contain' />
        <View style={styles.information}>
          <Text style={textStyles.name}>{name}</Text>
          <Text numberOfLines={1} style={textStyles.description}>{description}</Text>
        </View>
        <Image style={styles.icon} source={levels[level]} resizeMode='contain' />
      </TouchableOpacity>
    );
  }
}
