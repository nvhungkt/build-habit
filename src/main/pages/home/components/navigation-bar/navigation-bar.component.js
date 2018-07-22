import React from 'react';
import { TouchableOpacity } from 'react-native';
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
        <Body style={{ flex: 3, justifyContent: 'center', alignItems: 'stretch' }}>
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={this.props.reload}>
            <Title style={styles.appName}>Everyday Awesome</Title>
          </TouchableOpacity>
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
