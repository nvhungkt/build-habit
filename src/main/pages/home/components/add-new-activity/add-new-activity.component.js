import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';

import { styles } from './add-new-activity.style';

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
