import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Content, Text, Icon } from 'native-base';

import icons from '../../assets/icon-index';

import { styles, textStyles } from './notifications.style';

const notifications = [
  {
    id: '123',
    title: 'Have breakfast',
    description: 'A healthy breakfast brings your life',
    icon: 'breakfast',
    time: 1529728137002,
    timeRange: '06:00-06:30',
    done: true
  },
  {
    id: '123',
    title: 'Have breakfast',
    description: 'A healthy breakfast brings your life. A very long notes. A very long notes. A very long notes.',
    icon: 'breakfast',
    time: 1529728137002,
    timeRange: '06:00-06:30',
    done: true
  },
  {
    id: '123',
    title: 'Have breakfast',
    description: 'A healthy breakfast brings your life',
    icon: 'breakfast',
    time: 1529728137002,
    timeRange: '06:00-06:30',
    done: false
  }
];

export default class Notifications extends React.Component {
  static navigationOptions = {
    title: 'Notifications',
    headerTitleStyle: styles.title
  }

  render() {
    return (
      <Content style={styles.container}>
        {notifications.map((notification, index) => {
          const { title, description, icon, time, timeRange, done } = notification;
          const date = new Date(time);

          return (
            <TouchableOpacity style={styles.row} key={index}>
              {icon && <Image style={styles.icon} source={icons[icon]} resizeMode='contain' />}
              <View style={styles.content}>
                <Text style={textStyles(done).title}>{timeRange}</Text>
                <Text style={textStyles(done).title}>{title}</Text>
                <Text numberOfLines={2} style={textStyles(done).notes}>{description}</Text>
              </View>
              <View style={styles.info}>
                <Text style={textStyles(done).time}>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</Text>
                <Icon style={textStyles(done).status} name="md-checkmark" />
              </View>
            </TouchableOpacity>
          );
        })}
      </Content>
    );
  }
}
