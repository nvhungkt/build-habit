import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 80,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc'
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
    paddingLeft: 20,
    alignSelf: 'center'
  },
  status: {
    flex: 2,
    alignItems: 'center',
    alignSelf: 'center'
  }
});

export const textStyles = done => ({
  todo: {
    color: done ? '#424242' : '#777',
    fontSize: 20,
    fontWeight: 'bold'
  },
  times: {
    color: done ? '#424242' : '#777',
    fontSize: 20
  },
  status: {
    color: done ? '#64dd17' : '#777',
    fontSize: 34
  }
});
