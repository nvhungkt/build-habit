import React from 'react';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import { styles } from './navigation-bar.style';

export default class NavigationBar extends React.Component {

  render() {
    return (
      <Header style={styles.header} hasTabs>
        <Left style={{ flex: 1 }}>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon style={{color: 'black'}} name='menu' />
          </Button>
        </Left>
        <Body style={{ flex: 3 }}>
          <Title style={styles.appName}>Everyday Awesome</Title>
        </Body>
        <Right style={{ flex: 1 }}>
          <Button transparent onPress={this.props.openDatePicker}>
            <Icon style={{color: 'black'}} name='md-calendar' />
          </Button>
          <Button transparent onPress={() => this.props.navigation.push('Notifications')}>
            <Icon style={{color: 'black'}} name='notifications' />
          </Button>
        </Right>
      </Header>
    );
  }
}
