import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Content, Text, Icon } from 'native-base';

import { formatFullDate } from '../../utils/time';

import icons from '../../assets/icon-index';

import { styles, textStyles } from './notifications.style';

export default class Notifications extends React.Component {
  static navigationOptions = {
    title: 'Notifications',
    headerTitleStyle: styles.title
  }

  componentDidMount() {
    this.props.loadNotifications && this.props.loadNotifications();
  }

  componentDidUpdate(prevProps) {
    if (this.props.success !== prevProps.success) {
      if (this.props.success) {
        this.props.loadNotifications && this.props.loadNotifications();
      }
    }
  }

  handleChooseHabit = (habitId, time) => {
    this.props.navigation.push('Detail', { habitId, time });
  }

  render() {
    return (
      <Content style={styles.container}>
        {this.props.notifications.map((notification, index) => {
          const { id, title, description, icon, time, timeRange, done } = notification;
          const date = new Date(time);

          return (
            <TouchableOpacity onPress={() => this.handleChooseHabit(id, time)} style={styles.row} key={index}>
              {icon && <Image style={styles.icon} source={icons[icon]} resizeMode='contain' />}
              <View style={styles.content}>
                <Text style={textStyles(done).title}>{timeRange}</Text>
                <Text style={textStyles(done).title}>{title}</Text>
                <Text numberOfLines={2} style={textStyles(done).notes}>{description}</Text>
              </View>
              <View style={styles.info}>
                <Text style={textStyles(done).time}>{formatFullDate(date)}</Text>
                <Icon style={textStyles(done).status} name="md-checkmark" />
              </View>
            </TouchableOpacity>
          );
        })}
      </Content>
    );
  }
}
