import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Content, Button, Text, Icon } from 'native-base';
import { ProgressCircle, BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';

import icons from '../../assets/icon-index';
import levels from '../../assets/level-index';

import { getNumberOfDatesInLastMonth } from '../../utils/time';
import {
  FIRST_WEEK,
  SECOND_WEEK,
  THIRD_WEEK,
  FOURTH_WEEK
} from '../../constant/time';

import { styles, textStyles, chartStyles, chartMonthStyles } from './detail.style';
import { convertHabitDetail } from './detail.utility';

const ARRAY_START = 0;
const ARRAY_STEP = 1;
const MAX_SCORE = 30;
const MIN_SCORE = 0;
const SCORE_INCREMENT = 1;
const ONE_HUNDRED_PERCENT = 100;
const DAYS_OF_WEEK = 7;
const MINIMUM_DATA = 1;
const LEVEL_1 = 20;
const LEVEL_2 = 40;
const LEVEL_3 = 60;
const LEVEL_4 = 80;
const LEVEL_5 = 100;

const LEVEL_SCORE = [LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4, LEVEL_5];
const LEVEL_NAME = ['not-ranking', 'beginner', 'fluency', 'experience', 'expert', 'master'];

const getProgress = logs => {
  if (!logs) return MIN_SCORE;

  let score = MIN_SCORE;

  logs.forEach(log => {
    if (log.done) {
      score = Math.min(MAX_SCORE, score + SCORE_INCREMENT);
    } else {
      score = Math.max(MIN_SCORE, score - SCORE_INCREMENT);
    }
  });

  return score / MAX_SCORE;
};

const getLevel = logs => {
  if (!logs) return LEVEL_NAME[ARRAY_START];

  let score = MIN_SCORE;

  logs.forEach(log => {
    if (log.done) {
      score += SCORE_INCREMENT + SCORE_INCREMENT;
    } else {
      score = Math.max(MIN_SCORE, score - SCORE_INCREMENT);
    }
  });

  for (let i = 0; i < LEVEL_SCORE.length; i++) {
    if (score < LEVEL_SCORE[i]) return LEVEL_NAME[i];
  }

  return LEVEL_NAME[LEVEL_NAME.length - ARRAY_STEP];
};

const getChartData = logs => {
  if (!logs || !logs.length) return [DAYS_OF_WEEK, DAYS_OF_WEEK, DAYS_OF_WEEK, DAYS_OF_WEEK];

  let data = [];
  const numberOfWeeks = Math.ceil(logs.length / DAYS_OF_WEEK);

  for (let i = 0; i < numberOfWeeks; i++) {
    data.push(logs.slice(i * DAYS_OF_WEEK, (i + ARRAY_STEP) * DAYS_OF_WEEK).filter(log => log.done).length);
  }

  return data;
};

const renderLastMonthLogs = (logs = []) => {
  const numberOfDates = getNumberOfDatesInLastMonth();
  const shortLogs = logs.length > numberOfDates ? logs.slice(logs.length - numberOfDates) : logs;

  let lastMonthLogs = shortLogs.map((log, index) => {
    const dateOfMonth = new Date(log.time).getDate();

    return (
      <View key={index} style={chartMonthStyles(log.done).date}>
        <Text style={chartMonthStyles(log.done).dateIcon}>{dateOfMonth}</Text>
      </View>
    );
  });

  const currentLength = lastMonthLogs.length;
  const expectedLength = Math.ceil(lastMonthLogs.length / DAYS_OF_WEEK) * DAYS_OF_WEEK;

  for (let i = 0; i < expectedLength - currentLength; i++) {
    lastMonthLogs.push(<View key={expectedLength + i} style={chartMonthStyles().date}></View>);
  }

  return (
    <React.Fragment>
      <View style={chartMonthStyles().rowChart}>
        {lastMonthLogs.slice(ARRAY_START, FIRST_WEEK).map(date => date)}
      </View>
      {
        lastMonthLogs.length > FIRST_WEEK &&
        <View style={chartMonthStyles().rowChart}>
          {lastMonthLogs.slice(FIRST_WEEK, SECOND_WEEK).map(date => date)}
        </View>
      }
      {
        lastMonthLogs.length > SECOND_WEEK &&
        <View style={chartMonthStyles().rowChart}>
          {lastMonthLogs.slice(SECOND_WEEK, THIRD_WEEK).map(date => date)}
        </View>
      }
      {
        lastMonthLogs.length > THIRD_WEEK &&
        <View style={chartMonthStyles().rowChart}>
          {lastMonthLogs.slice(THIRD_WEEK, FOURTH_WEEK).map(date => date)}
        </View>
      }
      {
        lastMonthLogs.length > FOURTH_WEEK &&
        <View style={chartMonthStyles().rowChart}>
          {lastMonthLogs.slice(FOURTH_WEEK).map(date => date)}
        </View>
      }
    </React.Fragment>
  );
};

export default class Detail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { habit = {} } = navigation.state.params;
    const handleEdit = () => navigation.push('AddActivityDetail', { template: habit, editMode: true });

    return {
      headerTitle: (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Image style={styles.habitIcon} source={icons[habit.icon]} resizeMode='contain' />
          <Text style={textStyles.title}>{habit.title || 'Details'}</Text>
        </View>
      ),
      headerTitleStyle: styles.title,
      headerRight: (
        <React.Fragment>
          <Button transparent>
            <Icon style={{color: 'black'}} name='md-trash' />
          </Button>
          <Button onPress={handleEdit} transparent>
            <Icon style={{color: 'black'}} name='md-create' />
          </Button>
        </React.Fragment>
      ),
      headerRightStyle: {
        flex: 1,
        alignItems: 'center'
      }
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      showStatistic: false
    };
  }

  componentDidMount() {
    const { navigation, loadHabitDetail } = this.props;
    const habitId = navigation.getParam('habitId', null);

    loadHabitDetail && loadHabitDetail(habitId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.habit !== this.props.habit) {
      const { habitMembers } = this.props.habit;
      const habit = habitMembers ? habitMembers[habitMembers.length - ARRAY_STEP] : {};

      this.props.navigation.setParams({
        habit
      });
    }
  }

  toggleShowStatistic = () => {
    const { showStatistic } = this.state;

    this.setState({ showStatistic: !showStatistic });
  }

  onCheckDoneHabit = () => {
    const { navigation } = this.props;
    const time = navigation.getParam('time', null);
    const habitId = navigation.getParam('habitId', null);

    this.props.checkDone && this.props.checkDone(habitId, time);
    navigation.goBack();
  }

  onCheckUndoneHabit = () => {
    const { navigation } = this.props;
    const time = navigation.getParam('time', null);
    const habitId = navigation.getParam('habitId', null);

    this.props.checkDone && this.props.checkUndone(habitId, time);
    navigation.goBack();
  }

  render() {
    const { habitMembers, logs } = this.props.habit;
    const { showStatistic } = this.state;
    const habit = habitMembers ? convertHabitDetail(habitMembers[habitMembers.length - ARRAY_STEP]) : {};
    const progress = getProgress(logs);
    const level = getLevel(logs);
    const chartData = getChartData(logs);
    const yAxisData = [MINIMUM_DATA, DAYS_OF_WEEK];

    return (
      <React.Fragment>
        <Content style={styles.container}>
          <View style={styles.content}>
            <View style={styles.row}>
              <View style={styles.progress}>
                <ProgressCircle
                  style={styles.scoreIcon}
                  progress={progress}
                  progressColor={'#E91E63'}
                />
                <Text style={textStyles.progress}>{Math.round(progress * ONE_HUNDRED_PERCENT)}%</Text>
              </View>
              <Image style={styles.scoreIcon} source={levels[level]} resizeMode='contain' />
            </View>

            <View style={styles.detailContent}>
              <View style={styles.row}>
                <Icon style={styles.icon} name='md-list' />
                <Text style={textStyles.default}>{habit.description}</Text>
              </View>
              <View style={styles.row}>
                <Icon style={styles.icon} name='md-alarm' />
                <Text style={textStyles.default}>{habit.timeRange}</Text>
              </View>
              <View style={styles.row}>
                <Icon style={styles.icon} name='md-refresh' />
                <Text style={textStyles.default}>{habit.scheduler}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.row} onPress={this.toggleShowStatistic}>
              <Text style={textStyles.small}>{showStatistic ? 'Hide' : 'Show'} statistic</Text>
            </TouchableOpacity>

            {showStatistic ?
              <React.Fragment>
                <View style={styles.row}>
                  <Text style={textStyles.title}>Activity Frequence</Text>
                </View>
                <View style={styles.row}>
                  <YAxis
                    data={yAxisData}
                    style={chartStyles(chartData).yAxis}
                    svg={chartStyles(chartData).yAxisSvg}
                    contentInset={chartStyles(chartData).yAxisInset}
                    numberOfTicks={7}
                    formatLabel={value => `${value} time${value > MINIMUM_DATA ? 's' : ''}`}
                  />
                  <BarChart
                    style={chartStyles(chartData).chart}
                    data={chartData}
                    svg= {chartStyles(chartData).chartSvg}
                    spacingInner={0.35}
                    numberOfTicks={Math.max(...chartData) - Math.min(...chartData)}
                    contentInset={chartStyles(chartData).chartInset}
                  >
                    <Grid/>
                  </BarChart>
                </View>
                <View style={styles.row}>
                  <Text style={chartStyles(chartData).xAxisLabel}>Week</Text>
                  <XAxis
                    data={chartData}
                    style={chartStyles(chartData).xAxis}
                    svg={chartStyles(chartData).xAxisSvg}
                    formatLabel={value => value + ARRAY_STEP}
                    contentInset={chartStyles(chartData).xAxisInset}
                  />
                </View>

                <View style={styles.row}>
                  <Text style={textStyles.title}>Last Month Logs</Text>
                </View>
                {renderLastMonthLogs(logs)}

              </React.Fragment> : null
            }
          </View>
        </Content>

        {showStatistic ? null :
          <View style={styles.actions}>
            <View>
              <Button style={styles.close} rounded onPress={this.onCheckUndoneHabit}>
                <Icon style={textStyles.actionIcon} name='md-close' />
              </Button>
            </View>
            <View>
              <Button style={styles.done} rounded onPress={this.onCheckDoneHabit}>
                <Icon style={textStyles.actionIcon} name='md-checkmark' />
              </Button>
            </View>
          </View>
        }
      </React.Fragment>
    );
  }
}
