import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';

import { styles } from './sidebar.style';

export default class SideBar extends React.Component {
  render() {
    return (
      <View style={styles.sidebar}>
        <Text>Drawer</Text>
      </View>
    );
  }
}
