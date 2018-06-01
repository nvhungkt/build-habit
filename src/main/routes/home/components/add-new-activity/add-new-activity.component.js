import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Link } from 'react-router-native';
import { Button, Text } from 'native-base';

export default class AddNewActivity extends React.Component {
  render() {
    return (
      <View style={styles.center}>
        <Button bordered rounded info>
          <Link to="/add-activity">
            <Text>Add new habit</Text>
          </Link>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center'
  }
});
