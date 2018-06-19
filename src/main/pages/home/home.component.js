import React from 'react';
import { DatePickerAndroid } from 'react-native';
import { Tab, Tabs, Content, ScrollableTab, Drawer } from 'native-base';

import NavigationBar from './components/navigation-bar';
import SideBar from './components/sidebar';
import AddNewActivity from './components/add-new-activity';
import Todo from './components/todo';
import TodoList from './components/todolist';

import icons from '../../assets/icon-index';

import { styles, textStyles } from './home.style';
import { formatDate, isYesterday, isToday, isTomorrow } from './home.utility';

const news = "news";

const DAY_RANGE = 7;
const INTERVAL_TIME = 0;
const MONTH_GAP = 1;

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
                icon={icons[habit.icon]}
                navigation={navigation}
              />
            )}
          </TodoList>
          <TodoList name='Afternoon'>
            <Todo todo='Readbook' times='13:15 - 14:00' status='Not done' icon={icons[news]} />
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
      currentDate: new Date()
    };
  }

  componentDidMount() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    const fromDate = new Date(year, month, day - DAY_RANGE);
    const toDate = new Date(year, month, day + DAY_RANGE);

    const fromDateStr = `${fromDate.getMonth() + MONTH_GAP}/${fromDate.getDate()}/${fromDate.getFullYear()}`;
    const toDateStr = `${toDate.getMonth() + MONTH_GAP}/${toDate.getDate()}/${toDate.getFullYear()}`;

    this.props.loadHabits && this.props.loadHabits(fromDateStr, toDateStr);

    this.props.navigation.setParams({
      openDrawer: this.openDrawer,
      openDatePicker: this.openDatePicker
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.habits !== prevProps.habits) {
      // this.setState({ activePage: DAY_RANGE });
      setTimeout(() => {
        this.setState({ activePage: DAY_RANGE });
      }, INTERVAL_TIME);
    }
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
    const { habits, navigation, loadHabitDetail } = this.props;

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
          {renderTabs(habits, { navigation, loadHabitDetail })}
        </Tabs>
        <AddNewActivity navigation={this.props.navigation} />
      </Drawer>
    );
  }
}
