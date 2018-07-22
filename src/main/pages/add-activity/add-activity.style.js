import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  title: {
    alignSelf: 'center'
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
  themeText: {
    color: '#E91E63'
  },
  loading: {
    fontSize: 26,
    fontFamily: "Pacifico",
    color: '#000'
  }
});
