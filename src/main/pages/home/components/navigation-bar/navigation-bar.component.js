import React from 'react';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { Notifications } from 'expo';

import { styles } from './navigation-bar.style';

const pushNotification = () => {
  const localNotification = {
    title: 'Wake up idiot',
    body: 'Where the fuck I am',
    android:
    {
      sound: true,
      // icon (optional) (string) — URL of icon to display in notification drawer.
      // color (optional) (string) — color of the notification icon in notification drawer.
      // (optional) (min | low | high | max)
      priority: 'high',
      // sticky: false,
      vibrate: true
      // vibration pattern, e.g. - [ 0, 500 ].
      // link (optional) (string) — external link to open when notification is selected.
    }
  };
  let t = new Date();

  t.setSeconds(t.getSeconds() + 30);

  const schedulingOptions = {
    time: t
    // repeat: repeat
  };

  Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
};

export default class NavigationBar extends React.Component {

  render() {
    return (
      <Header style={styles.header} hasTabs>
        <Left style={{ flex: 1 }}>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon style={{color: 'black'}} name='menu' />
          </Button>
        </Left>
        <Body style={{ flex: 1 }}>
          <Title style={styles.appName}>Habit</Title>
        </Body>
        <Right style={{ flex: 1 }}>
          <Button transparent onPress={this.props.openDatePicker}>
            <Icon style={{color: 'black'}} name='md-calendar' />
          </Button>
          <Button transparent onPress={pushNotification}>
            <Icon style={{color: 'black'}} name='notifications' />
          </Button>
        </Right>
      </Header>
    );
  }
}
