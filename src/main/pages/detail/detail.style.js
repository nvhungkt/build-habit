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
  title: {
    textAlign: 'center',
    alignSelf: 'center'
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 80
  },
  icon: {
    flex: 1,
    width: 120,
    height: 120
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

export const textStyles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20
  },
  description: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20
  },
  scheduler: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    color: '#999'
  },
  time: {
    fontSize: 34,
    marginTop: 20,
    color: '#009688'
  },
  actionIcon: {
    fontSize: 34
  }
});
