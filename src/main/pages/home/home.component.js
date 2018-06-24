import React from 'react';
import { DatePickerAndroid, View } from 'react-native';
import { Tab, Tabs, Content, ScrollableTab, Drawer, Text, Toast } from 'native-base';

import NavigationBar from './components/navigation-bar';
import SideBar from './components/sidebar';
import AddNewActivity from './components/add-new-activity';
import Todo from './components/todo';
import TodoList from './components/todolist';

import { styles, textStyles } from './home.style';
import { formatDate, isYesterday, isToday, isTomorrow } from './home.utility';

const DAY_RANGE = 7;
const INTERVAL_TIME = 50;
const MONTH_GAP = 1;
const TOAST_DURATION = 3000;

const renderTabs = (dates, { navigation, loadHabitDetail }) => {
  return dates.map((item, index) => {
    const { habits } = item;
    const { date, month, year } = item.day;
    const newDate = new Date(year, month - MONTH_GAP, date);
    let heading = formatDate(newDate);

    if (isYesterday(newDate)) heading = "Yesterday";
    if (isToday(newDate)) heading = "Today";
    if (isTomorrow(newDate)) heading = "Tomorrow";

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
            {habits.map((habit, habitIndex) =>
              <Todo
                key={habitIndex}
                loadHabitDetail={loadHabitDetail}
                habitId={habit.id}
                todo={habit.title}
                times={habit.timeRange}
                done={habit.done}
                icon={habit.icon}
                navigation={navigation}
              />
            )}
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
      debug: null
    };
  }

  componentDidMount() {
    const today = new Date();

    this.loadHomePage(today);

    this.props.navigation.setParams({
      openDrawer: this.openDrawer,
      openDatePicker: () => this.openDatePicker()
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.habits !== prevProps.habits) {
      setTimeout(() => {
        this.setState({ activePage: DAY_RANGE });
      }, INTERVAL_TIME);
    }

    if (this.props.success !== prevProps.success) {
      if (this.props.success) {
        Toast.show({
          text: this.props.activityStatus,
          buttonText: 'Okay',
          duration: TOAST_DURATION,
          type: 'success',
          onClose: () => {
            this.props.resetStatus();
            this.loadHomePage(new Date());
          }
        });
      }
    }
  }

  async openDatePicker() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open();

      if (action !== DatePickerAndroid.dismissedAction) {
        const chosenDate = new Date(year, month, day);

        this.loadHomePage(chosenDate);
      }
    } catch (error) {
      return;
    }
  }

  loadHomePage = date => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const fromDate = new Date(year, month, day - DAY_RANGE);
    const toDate = new Date(year, month, day + DAY_RANGE);

    const fromDateStr = `${fromDate.getMonth() + MONTH_GAP}/${fromDate.getDate()}/${fromDate.getFullYear()}`;
    const toDateStr = `${toDate.getMonth() + MONTH_GAP}/${toDate.getDate()}/${toDate.getFullYear()}`;

    this.props.loadHabits && this.props.loadHabits(fromDateStr, toDateStr);
  }

  closeDrawer = () => {
    this.drawer._root.close();
  };

  openDrawer = () => {
    this.drawer._root.open();
  };

  render() {
    const { habits, navigation, loadHabitDetail } = this.props;

    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        onClose={this.closeDrawer}
        content={<SideBar />}
      >
        <Tabs
          tabBarUnderlineStyle={styles.tabBarUnderLine}
          page={this.state.activePage}
          renderTabBar={() => <ScrollableTab tabsContainerStyle={styles.tab}/>}
        >
          {renderTabs(habits, { navigation, loadHabitDetail })}
        </Tabs>
        {this.state.debug && <Text>{this.state.debug}</Text>}
        <AddNewActivity navigation={this.props.navigation} />
      </Drawer>
    );
  }
}
