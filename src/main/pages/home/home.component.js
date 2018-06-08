import React from 'react';
import { Tab, Tabs, Content, ScrollableTab } from 'native-base';

import NavigationBar from './components/navigation-bar';
import AddNewActivity from './components/add-new-activity';
import Todo from './components/todo';
import TodoList from './components/todolist';

import { styles, textStyles } from './home.style';
import { formatDate, isYesterday, isToday, isTomorrow } from './home.utility';

const LAST_WEEK = -7;
const NEXT_WEEK = 7;
const INTERVAL_TIME = 0;

const tabList = (inputDate = new Date()) => {
  const day = inputDate.getDate();
  const month = inputDate.getMonth();
  const year = inputDate.getFullYear();

  const tabs = [];

  for (let i = LAST_WEEK; i <= NEXT_WEEK; i++) {
    const date = new Date(year, month, day + i);
    let heading = formatDate(date);

    if (isYesterday(date)) heading = "Yesterday";
    if (isToday(date)) heading = "Today";
    if (isTomorrow(date)) heading = "Tomorrow";

    tabs.push({ heading, date });
  }

  return tabs;
};

const renderTabs = tabs => {
  return tabs.map((tab, index) => {
    return (
      <Tab
        key={index}
        tabStyle={styles.tab}
        activeTabStyle={styles.tab}
        textStyle={textStyles.tabText}
        activeTextStyle={textStyles.activeText}
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

  constructor(props) {
    super(props);
    this.state = {
      activePage: 7,
      currentDate: new Date(),
      tabs: tabList()
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ activePage: 7 });
    }, INTERVAL_TIME);
  }

  render() {
    return (
      <React.Fragment>
        <Tabs
          style={styles.tab}
          tabBarUnderlineStyle={styles.tabBarUnderLine}
          page={this.state.activePage}
          onChangeTab={this.handleChangeTab}
          renderTabBar={() => <ScrollableTab />}
        >
          {renderTabs(this.state.tabs)}
        </Tabs>
        <AddNewActivity navigation={this.props.navigation} />
      </React.Fragment>
    );
  }
}
