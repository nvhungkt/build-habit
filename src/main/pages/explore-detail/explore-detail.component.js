import React from 'react';
import { View, Image, Modal } from 'react-native';
import { Content, Button, Text, Icon } from 'native-base';
import { ProgressCircle, BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';

import icons from '../../assets/icon-index';
import levels from '../../assets/level-index';

import CommentModal from './components/comment-modal';

import { styles, textStyles, chartStyles } from './explore-detail.style';

const ARRAY_STEP = 1;
const ONE_HUNDRED_PERCENT = 100;
const MINIMUM_DATA = 1;
const THREE_TIMES = 3;
const FIVE_TIMES = 5;
const SIX_TIMES = 6;
const SEVEN_TIMES = 7;

export default class ExploreDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const habit = navigation.getParam('habit', {});
    const { icon, name } = habit;
    const handleAdd = () => navigation.push('AddActivityDetail');

    return {
      headerTitle: (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Image style={styles.habitIcon} source={icons[icon]} resizeMode='contain' />
          <Text style={textStyles.title}>{name || 'Details'}</Text>
        </View>
      ),
      headerTitleStyle: styles.title,
      headerRight: (
        <Button style={{ height: 54 }} onPress={handleAdd} transparent>
          <Text style={{ color: '#E91E63' }}>ADD</Text>
        </Button>
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
      liked: false,
      openIconModal: false
    };
  }

  render() {
    const habit = this.props.navigation.getParam('habit', {});
    const { level, description } = habit;
    const progress = 0.6;
    const chartData = [FIVE_TIMES, THREE_TIMES, SEVEN_TIMES, SIX_TIMES, SEVEN_TIMES];
    const yAxisData = [MINIMUM_DATA, SEVEN_TIMES];

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
                <Text style={textStyles.default}>{description}</Text>
              </View>
              <View style={styles.row}>
                <Icon style={styles.icon} name='md-alarm' />
                <Text style={textStyles.default}>08:00 - 09:00</Text>
              </View>
              <View style={styles.row}>
                <Icon style={styles.icon} name='md-refresh' />
                <Text style={textStyles.default}>Every day</Text>
              </View>
            </View>

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

          </View>
        </Content>

        <View style={styles.action}>
          <Button
            style={{ height: 50, flex: 1, justifyContent: 'center' }}
            onPress={() => this.setState({ liked: !this.state.liked })}
            transparent
          >
            {
              this.state.liked ?
              <Icon style={{ color: '#E91E63' }} name='md-heart' /> :
              <Icon style={{ color: '#aaa' }} name='md-heart' />
            }
            {
              this.state.liked ?
              <Text style={{ color: '#E91E63' }}>Like</Text> :
              <Text style={{ color: '#aaa' }}>Like</Text>
            }
          </Button>
          <Button
            style={{ height: 50, flex: 1, justifyContent: 'center' }}
            onPress={() => this.setState({ openIconModal: true })}
            transparent
          >
            <Icon style={{ color: '#aaa' }} name='md-text' />
            <Text style={{ color: '#aaa' }}>Comment</Text>
          </Button>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.openIconModal}
            onRequestClose={() => this.setState({ openIconModal: false })}
          >
            <CommentModal />
          </Modal>
        </View>
      </React.Fragment>
    );
  }
}
