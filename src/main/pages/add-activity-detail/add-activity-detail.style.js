import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 36
  },
  habitIcon: {
    flex: 1,
    alignItems: 'center'
  },
  iconImage: {
    width: 100,
    height: 100
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 10
  },
  iconTop: {
    paddingTop: 15,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  iconCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  iconBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  icon: {
    color: '#009C0E'
  },
  input: {
    marginTop: 2
  },
  text: {
    flex: 7
  },
  timePicker: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15
  },
  dateButton: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center'
  },
  form: {
    paddingRight: 20,
    paddingBottom: 20
  },
  scheduler: {
    flex: 6,
    paddingLeft: 20,
    alignSelf: 'center',
    color: '#999'
  }
});

export const textStyles = StyleSheet.create({
  timeTitle: {
    fontSize: 18
  },
  time: {
    fontSize: 22
  },
  dateActive: {
    color: '#E91E63'
  },
  dateNotActive: {
    color: '#999'
  }
});
