import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  title: {
    textAlign: 'center',
    alignSelf: 'center'
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  progress: {
    position: 'relative'
  },
  detailContent: {
    width: 350,
    flex: 1,
    flexDirection: 'column'
  },
  habitIcon: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  scoreIcon: {
    width: 100,
    height: 100,
    marginLeft: 30,
    marginRight: 30
  },
  icon: {
    width: 40,
    color: '#009C0E'
  }
});

export const chartStyles = (chartData = []) => {
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
      fill: '#AED581'
    },
    chartInset: {
      top: topInset,
      bottom: bottomInset
    },
    xAxisLabel: {
      color: '#999',
      fontSize: 14,
      width: 50,
      textAlign: 'right',
      marginTop: -12
    },
    xAxis: {
      width: WIDTH,
      marginTop: -6
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
  progress: {
    width: 160,
    fontSize: 30,
    fontWeight: 'bold',
    position: 'absolute',
    top: 30,
    left: 5,
    textAlign: 'center'
  }
});
