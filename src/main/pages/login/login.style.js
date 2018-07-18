import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  content: {
    width: 250,
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingTop: 30
  },
  title: {
    alignSelf: 'center'
  },
  input: {
    marginTop: 2
  },
  row: {
    flex: 1,
    marginTop: 20,
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
  }
});
