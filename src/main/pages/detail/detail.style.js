import { StyleSheet } from 'react-native';

const iconAction = color => ({
  backgroundColor: color,
  width: 72,
  height: 72,
  marginLeft: 48,
  marginRight: 48,
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
});

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  title: {
    textAlign: 'center',
    alignSelf: 'center'
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20
  },
  detailContent: {
    width: 350,
    flex: 1,
    flexDirection: 'column'
  },
  habitIcon: {
    width: 60,
    height: 60
  },
  icon: {
    width: 40,
    color: '#009688'
  },
  actions: {
    position: 'absolute',
    bottom: 48,
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  close: iconAction('#D50000'),
  done: iconAction('#64DD17')
});

export const chartStyles = chartData => {
  const DAYS_OF_WEEK = 7;
  const CHART_STEP = 30;
  const HALF = 0.5;
  const WIDTH = 300;
  const topInset = (DAYS_OF_WEEK - Math.max(...chartData)) * CHART_STEP;
  const bottomInset = Math.min(...chartData) * CHART_STEP;
  const xAxisPadding = WIDTH / chartData.length * HALF;

  return {
    yAxis: {
      width: 50
    },
    yAxisSvg: {
      fill: '#999',
      fontSize: 12,
      width: 50
    },
    yAxisInset: {
      top: CHART_STEP * HALF,
      bottom: CHART_STEP * HALF
    },
    chart: {
      height: DAYS_OF_WEEK * CHART_STEP,
      width: WIDTH
    },
    chartSvg: {
      fill: '#009688'
    },
    chartInset: {
      top: topInset,
      bottom: bottomInset
    },
    xAxisLabel: {
      color: '#999',
      fontSize: 14,
      width: 50,
      textAlign: 'right'
    },
    xAxis: {
      width: WIDTH,
      marginTop: 7
    },
    xAxisSvg: {
      fill: '#999',
      fontSize: 12
    },
    xAxisInset: {
      left: xAxisPadding,
      right: xAxisPadding
    }
  };
};

export const textStyles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 18
  },
  scheduler: {
    fontSize: 18
  },
  time: {
    fontSize: 18
  },
  actionIcon: {
    fontSize: 34
  }
});
