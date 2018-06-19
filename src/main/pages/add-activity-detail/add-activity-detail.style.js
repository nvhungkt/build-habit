import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  form: {
    paddingRight: 20,
    paddingBottom: 20
  },
  input: {
    marginTop: 2
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    alignItems: 'stretch'
  },
  scheduler: {
    flex: 6,
    paddingLeft: 20,
    alignSelf: 'center',
    color: '#999'
  },
  icon: {
    flex: 1,
    justifyContent: 'center'
  }
});

export const textStyles = StyleSheet.create({
  dateActive: {
    color: '#e91e63',
    fontSize: 12
  },
  dateNotActive: {
    color: '#999',
    fontSize: 12
  }
});
