import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 60,
    marginTop: 5
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  habit: {
    marginLeft: 18,
    flex: 5.5,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc'
  },
  action: {
    flex: 1,
    justifyContent: 'center'
  },
  icon: {
    flex: 1,
    width: undefined,
    height: undefined
  }
});
