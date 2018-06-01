import React from 'react';
import { StyleSheet } from 'react-native';
import { Tab, Tabs, Content } from 'native-base';

import NavigationBar from './components/navigation-bar';
import AddNewActivity from './components/add-new-activity';
import Todo from './components/todo/todo.component';
import TodoList from './components/todolist/todolist.component';

const tabList = [
  {
    heading: "Yesterday",
    link: "/yesterday"
  },
  {
    heading: "Today",
    link: "/today"
  },
  {
    heading: "Tomorrow",
    link: "/tomorrow"
  }
];

const styles = StyleSheet.create({
  tab: {
    backgroundColor: '#fff'
  },
  tabText: {
    color: 'black',
    fontSize: 17
  },
  activeText: {
    color: '#e91e63',
    fontSize: 20
  },
  tabBarUnderLine: {
    backgroundColor: '#e91e63'
  }
});

const renderTabs = tabs => {
  return tabs.map((tab, index) => {
    return (
      <Tab
        key={index}
        tabStyle={styles.tab}
        activeTabStyle={styles.tab}
        textStyle={styles.tabText}
        activeTextStyle={styles.activeText}
        heading={tab.heading}>
        <Content>
          <TodoList name='Morning'>
            <Todo todo='Exercises' times='06:15 - 06:45' status='Done' />
            <Todo todo='Have breakfast' times='07:00 - 07:20' status='Done' />
          </TodoList>
          <TodoList name='Afternoon'>
            <Todo todo='Readbook' times='13:15 - 14:00' status='Not done' />
          </TodoList>
          <TodoList name='Evening'>
          </TodoList>
        </Content>
      </Tab>
    );
  });
};

export default class Home extends React.Component {
  static navigationOptions = {
    header: <NavigationBar />
  }

  render() {
    return (
      <React.Fragment>
        <Tabs tabBarUnderlineStyle={styles.tabBarUnderLine} initialPage={1}>
          {renderTabs(tabList)}
        </Tabs>
        <AddNewActivity navigation={this.props.navigation} />
      </React.Fragment>
    );
  }
}
