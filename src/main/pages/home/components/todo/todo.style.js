import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  content: {
    flex: 1,
    flexDirection: 'row'
  },
  todo: {
    flex: 8,
    alignSelf: 'center'
  },
  status: {
    flex: 2,
    alignItems: 'center',
    alignSelf: 'center'
  }
});

export const textStyles = StyleSheet.create({
  todo: {
    color: '#424242',
    fontSize: 20,
    fontWeight: 'bold'
  },
  times: {
    color: '#424242',
    fontSize: 20
  },
  statusDone: {
    color: '#64dd17',
    fontSize: 20,
    fontWeight: 'bold'
  },
  statusNotDone: {
    color: '#424242',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
