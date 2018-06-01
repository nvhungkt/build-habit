import React from 'react';
import { StyleSheet } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Text, Title } from 'native-base';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff'
  }
});

export default class NavigationBar extends React.Component {
  render() {
    return (
      <Header style={styles.header}>
        <Left style={{ flex: 1 }}>
          <Button transparent onPress={() => this.props.navigation.goBack(null)}>
            <Icon style={{ color: 'black' }} name='ios-arrow-back' />
          </Button>
        </Left>
        <Body style={{ flex: 1 }}>
          <Title style={{ color: 'black', alignSelf: 'center' }}>Add new habit</Title>
        </Body>
        <Right style={{ flex: 1 }}>
          <Button transparent onPress={() => this.props.navigation.push('AddActivityDetail')}>
            <Text style={{ color: '#e91e63' }}>CREATE</Text>
          </Button>
        </Right>
      </Header>
    );
  }
}
