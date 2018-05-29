import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Tab, Tabs } from 'native-base';

export default class NavigationBar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header style={styles.header} hasTabs>
          <Left style={{ flex: 1 }}>
            <Button transparent>
              <Icon style={{color: 'black'}} name='menu' />
            </Button>
          </Left>
          <Body style={{ flex: 1 }}>
            <Text style={styles.appName}>Habit</Text>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button transparent>
              <Icon style={{color: 'black'}} name='notifications' />
            </Button>
          </Right>
        </Header>
        <Tabs tabBarUnderlineStyle={styles.tabBarUnderLine} initialPage={1}>
          <Tab
            tabStyle={styles.header}
            activeTabStyle={styles.header}
            textStyle={styles.tabText}
            activeTextStyle={styles.activeText}
            heading="Yesterday">
          </Tab>
          <Tab
            tabStyle={styles.header}
            activeTabStyle={styles.header}
            textStyle={styles.tabText}
            activeTextStyle={styles.activeText}
            heading="Today">
          </Tab>
          <Tab
            tabStyle={styles.header}
            activeTabStyle={styles.header}
            textStyle={styles.tabText}
            activeTextStyle={styles.activeText}
            heading="Tomorrow">
          </Tab>
        </Tabs>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  appName: {
    fontSize: 22,
    flex: 1,
    alignItems: 'flex-end',
    alignSelf: 'center'
  },
  header: {
    backgroundColor: '#fff'
  },
  tabText: {
    color: 'black'
  },
  activeText: {
    color: '#e91e63'
  },
  tabBarUnderLine: {
    backgroundColor: '#e91e63'
  }
});
