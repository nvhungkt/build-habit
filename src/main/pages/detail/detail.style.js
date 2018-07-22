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
  },
  actions: {
    position: 'absolute',
    bottom: 48,
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  close: iconAction('#D50000'),
  done: iconAction('#64DD17'),
  loading: {
    position: 'absolute',
    backgroundColor: '#fff',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.7,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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

export const chartMonthStyles = done => ({
  rowChart: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: 350,
    marginTop: 5,
    marginBottom: 5
  },
  date: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 22,
    backgroundColor: done ? '#81C784' : '#eee'
  },
  dateIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    color: done ? '#fff' : '#000'
  }
});

export const textStyles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  notice: {
    fontSize: 16,
    color: '#009C0E',
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
  },
  default: {
    fontSize: 18
  },
  small: {
    fontSize: 16,
    color: '#888'
  },
  actionIcon: {
    fontSize: 34
  },
  loading: {
    fontSize: 26,
    fontFamily: "Pacifico",
    color: '#000'
  }
});
