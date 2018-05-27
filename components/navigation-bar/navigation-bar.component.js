import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class NavigationBar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text>Hamburger</Text>
          <Text>Habit</Text>
          <Text>Notif</Text>
        </View>
        <View style={styles.dates}>
          <View style={styles.date}>
            <Text>Yesterday</Text>
          </View>
          <View style={styles.date}>
            <Text>Today</Text>
          </View>
          <View style={styles.date}>
            <Text>Tomorrow</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    paddingBottom: 0
  },
  dates: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  date: {
    flex: 1,
    alignItems: 'center'
  }
});
