import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  content: {
    flex: 1,
    flexDirection: 'row'
  },
  habit: {
    flex: 7,
    alignSelf: 'center'
  },
  action: {
    flex: 1,
    alignSelf: 'center'
  }
});
