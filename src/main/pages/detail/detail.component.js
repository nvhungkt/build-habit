import React from 'react';
import { View, Image } from 'react-native';
import { Content, Button, Text, Icon } from 'native-base';
import { ProgressCircle, BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';

import icons from '../../assets/icon-index';

import { styles, textStyles, chartStyles } from './detail.style';
import { convertHabitDetail } from './detail.utility';

const ARRAY_STEP = 1;
const MAX_SCORE = 30;
const MIN_SCORE = 0;
const ONE_HUNDRED_PERCENT = 100;
const DAYS_OF_WEEK = 7;
const MINIMUM_VALUE = 1;

const getProgress = logs => {
  if (!logs) return MIN_SCORE;

  const doneTimes = logs.filter(log => log.done).length;
  const score = Math.max(Math.min(doneTimes - (logs.length - doneTimes), MAX_SCORE), MIN_SCORE);

  return score / MAX_SCORE;
};

const getChartData = logs => {
  if (!logs) return [DAYS_OF_WEEK, DAYS_OF_WEEK, DAYS_OF_WEEK, DAYS_OF_WEEK];

  let data = [];
  const numberOfWeeks = Math.ceil(logs.length / DAYS_OF_WEEK);

  for (let i = 0; i < numberOfWeeks; i++) {
    data.push(logs.slice(i * DAYS_OF_WEEK, (i + ARRAY_STEP) * DAYS_OF_WEEK).filter(log => log.done).length);
  }

  return data;
};

export default class Detail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;

    return {
      title: state.params.title || 'Details',
      headerTitleStyle: styles.title,
      headerRight: (
        <React.Fragment>
          <Button transparent>
            <Icon style={{color: 'black'}} name='md-trash' />
          </Button>
          <Button transparent>
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

  componentDidMount() {
    const { navigation, loadHabitDetail } = this.props;
    const habitId = navigation.getParam('habitId', null);

    loadHabitDetail && loadHabitDetail(habitId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.habit !== this.props.habit) {
      const { habitMembers } = this.props.habit;
      const habit = habitMembers ? convertHabitDetail(habitMembers[habitMembers.length - ARRAY_STEP]) : {};

      this.props.navigation.setParams({
        title: habit.title
      });
    }
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
    const habit = habitMembers ? convertHabitDetail(habitMembers[habitMembers.length - ARRAY_STEP]) : {};
    const progress = getProgress(logs);
    const chartData = getChartData(logs);
    const yAxisData = [MINIMUM_VALUE, DAYS_OF_WEEK];

    return (
      <React.Fragment>
        <Content style={styles.container}>
          <View style={styles.content}>
            <View style={styles.row}>
              <ProgressCircle
                style={{ height: 100, width: 100 }}
                progress={progress}
                progressColor={'#e91e63'}
              />
              <Text>{Math.round(progress * ONE_HUNDRED_PERCENT)}%</Text>
            </View>

            <View style={styles.detailContent}>
              <View style={styles.row}>
                <Image style={styles.habitIcon} source={icons[habit.icon]} resizeMode='contain' />
                <Text style={textStyles.title}>{habit.title}</Text>
              </View>
              <View style={styles.row}>
                <Icon style={styles.icon} name='md-list' />
                <Text style={textStyles.description}>{habit.description}</Text>
              </View>
              <View style={styles.row}>
                <Icon style={styles.icon} name='md-alarm' />
                <Text style={textStyles.time}>{habit.timeRange}</Text>
              </View>
              <View style={styles.row}>
                <Icon style={styles.icon} name='md-refresh' />
                <Text style={textStyles.scheduler}>{habit.scheduler}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <YAxis
                data={yAxisData}
                style={chartStyles(chartData).yAxis}
                svg={chartStyles(chartData).yAxisSvg}
                contentInset={chartStyles(chartData).yAxisInset}
                numberOfTicks={7}
                formatLabel={value => `${value} time${value > MINIMUM_VALUE ? 's' : ''}`}
              />
              <BarChart
                style={chartStyles(chartData).chart}
                data={chartData}
                svg= {chartStyles(chartData).chartSvg}
                numberOfTicks={Math.max(...chartData)}
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
          </View>
        </Content>

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
      </React.Fragment>
    );
  }
}
