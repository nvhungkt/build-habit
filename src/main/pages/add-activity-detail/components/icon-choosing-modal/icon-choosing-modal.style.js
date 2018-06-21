import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modal: {
    flex: 1
  },
  header: {
    flex: 1,
    alignItems: 'center',
    padding: 10
  },
  body: {
    flex: 19
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly'
  },
  iconContainer: {
    margin: 10,
    height: 50,
    width: 50
  },
  icon: {
    flex: 1,
    width: undefined,
    height: undefined
  }
});

export const textStyles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  }
});
