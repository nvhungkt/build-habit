import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    height: 72,
    paddingTop: 12,
    paddingBottom: 12,
    borderTopWidth: 0.5,
    borderColor: '#ccc'
  },
  icon: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  information: {
    flex: 4.5,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignSelf: 'center'
  }
});

export const textStyles = StyleSheet.create({
  name: {
    color: '#424242',
    fontSize: 16,
    fontWeight: 'bold'
  },
  description: {
    color: '#424242',
    fontSize: 14
  }
});
