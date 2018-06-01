import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'native-base';

const styles = StyleSheet.create({
  center: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center'
  }
});

export default class AddNewActivity extends React.Component {
  render() {
    return (
      <View style={styles.center}>
        <Button rounded info onPress={() => this.props.navigation.push('AddActivity')}>
          <Text>Add new habit</Text>
        </Button>
      </View>
    );
  }
}
