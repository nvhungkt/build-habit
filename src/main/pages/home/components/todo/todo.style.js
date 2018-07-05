import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 80
  },
  content: {
    flex: 1,
    flexDirection: 'row'
  },
  icon: {
    flex: 2,
    width: undefined,
    height: undefined
  },
  todo: {
    flex: 8,
    height: 60,
    marginLeft: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc'
  },
  status: {
    flex: 2,
    alignItems: 'center',
    alignSelf: 'center'
  }
});

export const textStyles = done => ({
  todo: {
    color: done ? '#009688' : '#777',
    fontSize: 20,
    fontWeight: 'bold'
  },
  timeRange: {
    color: done ? '#424242' : '#777',
    fontSize: 20
  },
  status: {
    color: done ? '#64dd17' : '#777',
    fontSize: 34
  }
});
