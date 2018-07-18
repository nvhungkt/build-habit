import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';

import { styles } from './add-new-activity.style';

export default class AddNewActivity extends React.Component {
  render() {
    return (
      <View style={styles.center}>
        <Button style={styles.button} rounded info onPress={() => this.props.navigation.push('AddActivity')}>
          <Text>Practice more</Text>
        </Button>
      </View>
    );
  }
}
