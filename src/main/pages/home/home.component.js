import React from 'react';
import { DatePickerAndroid } from 'react-native';
import { Tab, Tabs, Content, ScrollableTab, Drawer } from 'native-base';

import NavigationBar from './components/navigation-bar';
import SideBar from './components/sidebar';
import AddNewActivity from './components/add-new-activity';
import Todo from './components/todo';
import TodoList from './components/todolist';

// import ICON from '../../assets/icon-index';

import dumbbell from '../../assets/icon/dumbbell.png';
import breakfast from '../../assets/icon/breakfast.png';
import news from '../../assets/icon/news.png';

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
            <Todo todo='Exercises' times='06:15 - 06:45' status='Done' icon={dumbbell}/>
            <Todo todo='Have breakfast' times='07:00 - 07:20' status='Done' icon={breakfast} />
          </TodoList>
          <TodoList name='Afternoon'>
            <Todo todo='Readbook' times='13:15 - 14:00' status='Not done' icon={news} />
          </TodoList>
          <TodoList name='Evening'>
          </TodoList>
        </Content>
      </Tab>
    );
  });
};

export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      header: <NavigationBar openDrawer={params.openDrawer} openDatePicker={params.openDatePicker} />
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      currentDate: new Date(),
      tabs: tabList()
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      openDrawer: this.openDrawer,
      openDatePicker: this.openDatePicker
    });

    setTimeout(() => {
      this.setState({ activePage: 7 });
    }, INTERVAL_TIME);
  }

  async openDatePicker() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open();

      if (action !== DatePickerAndroid.dismissedAction) {
        const currentDate = new Date(year, month, day);

        this.setState({ currentDate });
      }
    } catch (error) {
      return;
    }
  }

  closeDrawer = () => {
    this.drawer._root.close();
  };

  openDrawer = () => {
    this.drawer._root.open();
  };

  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        onClose={this.closeDrawer}
        content={<SideBar />}
      >
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
      </Drawer>
    );
  }
}
