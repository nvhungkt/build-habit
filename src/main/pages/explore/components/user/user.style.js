import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#ccc'
  },
  user: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    marginBottom: 15
  },
  icon: {
    flex: 2,
    width: 60,
    height: 60
  },
  information: {
    flex: 7,
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonActive: {
    backgroundColor: '#E91E63',
    height: 30
  },
  buttonNotActive: {
    borderColor: '#E91E63',
    height: 30
  }
});

export const textStyles = StyleSheet.create({
  name: {
    color: '#424242',
    fontSize: 16,
    fontWeight: 'bold'
  },
  buttonNotActive: {
    color: '#E91E63'
  }
});
