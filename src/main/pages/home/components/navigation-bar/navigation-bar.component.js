import React from 'react';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import { styles } from './navigation-bar.style';

export default class NavigationBar extends React.Component {
  render() {
    return (
      <Header style={styles.header} hasTabs>
        <Left style={{ flex: 1 }}>
          <Button transparent>
            <Icon style={{color: 'black'}} name='menu' />
          </Button>
        </Left>
        <Body style={{ flex: 1 }}>
          <Title style={styles.appName}>Habit</Title>
        </Body>
        <Right style={{ flex: 1 }}>
          <Button transparent>
            <Icon style={{color: 'black'}} name='md-calendar' />
          </Button>
          <Button transparent>
            <Icon style={{color: 'black'}} name='notifications' />
          </Button>
        </Right>
      </Header>
    );
  }
}
