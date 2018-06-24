import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: '#fff',
    flex: 1
  },
  block: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingLeft: 22,
    paddingRight: 22,
    paddingTop: 12
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingBottom: 12,
    paddingTop: 12
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  icon: {
    color: '#616161'
  },
  menuItem: {
    flex: 5,
    justifyContent: 'center'
  }
});

export const textStyles = StyleSheet.create({
  menuItem: {
    fontWeight: '500'
  }
});
