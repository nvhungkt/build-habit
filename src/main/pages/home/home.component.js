import React from 'react';
import { Notifications } from 'expo';
import { DatePickerAndroid, View } from 'react-native';
import { Tab, Tabs, Content, ScrollableTab, Drawer, Text, Toast } from 'native-base';

import { createNotificationTable, getNotification } from '../../sqlite/notification.sqlite';
import { getToken } from '../../sqlite/token.storage';

import NavigationBar from './components/navigation-bar';
import SideBar from './components/sidebar';
import AddNewActivity from './components/add-new-activity';
import Todo from './components/todo';
import TodoList from './components/todolist';

import { pushNotification } from './home.utils';

import {
  formatDateDisplay,
  formatDateCallApi,
  getDateApi,
  isYesterday,
  isToday,
  isTomorrow,
  isMorning,
  isAfternoon,
  isEvening
} from '../../utils/time';

import { styles, textStyles } from './home.style';

const DAY_RANGE = 7;
const INTERVAL_TIME = 50;
const TOAST_DURATION = 3000;

const renderTabs = (dates, { navigation }) => {
  return dates.map((item, index) => {
    const { habits } = item;
    const date = getDateApi(item.day);
    let heading = formatDateDisplay(date);

    if (isYesterday(date)) heading = "Yesterday";
    if (isToday(date)) heading = "Today";
    if (isTomorrow(date)) heading = "Tomorrow";

    const renderTodo = (habit, habitIndex) => (
      <Todo
        key={habitIndex}
        habitId={habit.id}
        todo={habit.title}
        timeRange={habit.timeRange}
        time={habit.time}
        done={habit.done}
        icon={habit.icon}
        navigation={navigation}
      />
    );

    return (
      <Tab
        key={index}
        tabStyle={styles.tab}
        activeTabStyle={styles.tab}
        textStyle={textStyles.tabText}
        activeTextStyle={textStyles.activeText}
        heading={heading}>
        <Content>
          <TodoList name='Morning'>
            {habits
              .filter(habit => isMorning(habit.time))
              .map((habit, habitIndex) => renderTodo(habit, habitIndex))
            }
          </TodoList>
          <TodoList name='Afternoon'>
            {habits
              .filter(habit => isAfternoon(habit.time))
              .map((habit, habitIndex) => renderTodo(habit, habitIndex))
            }
          </TodoList>
          <TodoList name='Evening'>
            {habits
              .filter(habit => isEvening(habit.time))
              .map((habit, habitIndex) => renderTodo(habit, habitIndex))
            }
          </TodoList>
          <View style={styles.veryEnd}></View>
        </Content>
      </Tab>
    );
  });
};

export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      header: <NavigationBar
                navigation={navigation}
                openDrawer={params.openDrawer}
                openDatePicker={params.openDatePicker}
              />
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      debug: null,
      token: null
    };
  }

  componentDidMount() {
    this.getToken();

    this.props.navigation.setParams({
      openDrawer: this.openDrawer,
      openDatePicker: () => this.openDatePicker()
    });

    this.notificationSubscription = Notifications.addListener(this.handleNotification);

    createNotificationTable();
    // logAllNotification();
    // cancelAllNotifications();
  }

  componentDidUpdate(prevProps) {
    if (this.props.habits !== prevProps.habits) {
      setTimeout(() => {
        this.setState({ activePage: DAY_RANGE });
      }, INTERVAL_TIME);
    }

    if (this.props.notifications !== prevProps.notifications) {
      this.props.notifications.forEach(notification => {
        pushNotification(notification);
      });
    }

    // const reload = this.props.navigation.getParam('reload', false);

    // console.log(reload);
    // if (reload) {
    //   this.getToken();
    // }

    if (this.props.success !== prevProps.success) {
      if (this.props.success) {
        this.loadHomePage(this.chosenDate || new Date());
        Toast.show({
          text: this.props.activityStatus,
          buttonText: 'Okay',
          duration: TOAST_DURATION,
          type: 'success',
          onClose: this.props.resetStatus
        });
      }
    }
  }

  getToken = async () => {
    this.token = await getToken();
    const today = new Date();

    this.loadHomePage(today);
    this.props.loadNotifications && this.props.loadNotifications(this.token);
  }

  async openDatePicker() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open();

      if (action !== DatePickerAndroid.dismissedAction) {
        const chosenDate = new Date(year, month, day);

        this.chosenDate = chosenDate;
        this.loadHomePage(this.chosenDate);
      }
    } catch (error) {
      return;
    }
  }

  handleNotification = notification => {
    const { origin, notificationId } = notification;

    if (origin === 'selected') {
      getNotification(notificationId, notificationRecord => {
        if (notificationRecord) {
          const { habitId, time } = notificationRecord;

          this.props.navigation.push('Detail', { habitId, time: Number(time) });
        }
      });
    }
  }

  loadHomePage = date => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const fromDate = new Date(year, month, day - DAY_RANGE);
    const toDate = new Date(year, month, day + DAY_RANGE);

    this.props.loadHabits && this.props.loadHabits(formatDateCallApi(fromDate), formatDateCallApi(toDate), this.token);
  }

  closeDrawer = () => {
    this.drawer._root.close();
  };

  openDrawer = () => {
    this.drawer._root.open();
  };

  render() {
    const { habits, navigation } = this.props;

    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        onClose={this.closeDrawer}
        content={<SideBar navigation={navigation} />}
      >
        <Tabs
          tabBarUnderlineStyle={styles.tabBarUnderLine}
          page={this.state.activePage}
          renderTabBar={() => <ScrollableTab tabsContainerStyle={styles.tab}/>}
        >
          {renderTabs(habits, { navigation })}
        </Tabs>
        {this.state.debug && <Text>{this.state.debug}</Text>}
        {this.props.success ? null : <AddNewActivity navigation={this.props.navigation} />}
      </Drawer>
    );
  }
}
