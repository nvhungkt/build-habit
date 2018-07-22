import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  title: {
    alignSelf: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    height: 84,
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: '#ccc'
  },
  icon: {
    flex: 2,
    width: undefined,
    height: undefined
  },
  content: {
    flex: 8,
    marginLeft: 20,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  info: {
    flex: 2,
    justifyContent: 'space-between',
    alignItems: 'flex-end'
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

export const textStyles = done => ({
  title: {
    color: done ? '#009C0E' : '#777',
    fontSize: 16,
    fontWeight: 'bold'
  },
  notes: {
    color: done ? '#424242' : '#777',
    fontSize: 14
  },
  time: {
    color: '#777',
    fontSize: 12
  },
  status: {
    color: done ? '#64dd17' : '#777',
    fontSize: 26
  },
  loading: {
    fontSize: 26,
    fontFamily: "Pacifico",
    color: '#000'
  }
});
