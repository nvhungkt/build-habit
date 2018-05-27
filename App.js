import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import NavigationBar from './components/navigation-bar/navigation-bar.component';
import Todo from './components/todo/todo.component';
import TodoList from './components/todolist/todolist.component';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar />
        <TodoList name='Morning'>
          <Todo todo='Exercises' times='06:15 - 06:45' status='Done' />
          <Todo todo='Have breakfast' times='07:00 - 07:20' status='Done' />
        </TodoList>
        <TodoList name='Afternoon'>
          <Todo todo='Readbook' times='13:15 - 14:00' status='Not done' />
        </TodoList>
        <TodoList name='Evening'>
        </TodoList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 20
  }
});
