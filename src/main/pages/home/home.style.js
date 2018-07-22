import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  veryEnd: {
    height: 50
  },
  tab: {
    backgroundColor: '#fff'
  },
  tabBarUnderLine: {
    backgroundColor: '#E91E63'
  },
  loading: {
    position: 'absolute',
    backgroundColor: '#fff',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.7,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export const textStyles = StyleSheet.create({
  tabText: {
    color: 'black',
    fontSize: 18
  },
  activeText: {
    color: '#E91E63',
    fontSize: 22
  },
  loading: {
    fontSize: 26,
    fontFamily: "Pacifico",
    color: '#000'
  }
});