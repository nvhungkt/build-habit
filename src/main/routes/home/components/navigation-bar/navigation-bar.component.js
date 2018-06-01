import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Link } from 'react-router-native';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

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
            <Icon style={{color: 'black'}} name='notifications' />
          </Button>
        </Right>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff'
  },
  appName: {
    fontSize: 32,
    fontFamily: "Pacifico",
    color: '#000',
    alignSelf: 'center'
  }
});
