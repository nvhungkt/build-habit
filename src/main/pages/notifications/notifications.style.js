import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  title: {
    alignSelf: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    height: 84,
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: '#ccc'
  },
  icon: {
    flex: 2,
    width: undefined,
    height: undefined
  },
  content: {
    flex: 8,
    marginLeft: 20,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  info: {
    flex: 2,
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  }
});

export const textStyles = done => ({
  title: {
    color: done ? '#009688' : '#777',
    fontSize: 16,
    fontWeight: 'bold'
  },
  notes: {
    color: done ? '#424242' : '#777',
    fontSize: 14
  },
  time: {
    color: '#777',
    fontSize: 12
  },
  status: {
    color: done ? '#64dd17' : '#777',
    fontSize: 26
  }
});
