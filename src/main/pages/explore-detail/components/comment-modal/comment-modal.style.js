import { StyleSheet } from 'react-native';

export const styles = {
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
  },
  search: {
    position: 'absolute',
    backgroundColor: '#fff',
    height: 60,
    left: 0,
    right: 0,
    borderTopWidth: 0.5,
    borderColor: '#ccc',
    padding: 10
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  }
};

export const textStyles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  }
});
