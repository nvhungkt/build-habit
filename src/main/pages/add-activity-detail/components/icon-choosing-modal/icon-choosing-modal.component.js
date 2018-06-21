import React from 'react';
import { ScrollView, TouchableOpacity, Image, View } from 'react-native';
import { Text } from 'native-base';

import icons from '../../../../assets/icon-index';

import { styles, textStyles } from './icon-choosing-modal.style';

export default class IconChoosingModal extends React.Component {

  render() {
    return (
      <View style={styles.modal}>
        <View style={styles.header}>
          <Text style={textStyles.title}>Choose Icon</Text>
        </View>
        <View style={styles.body}>
          <ScrollView>
            <View style={styles.container}>
              {Object.keys(icons).map(name => (
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => this.props.onChooseIcon(name)}
                  key={name}
                >
                  <Image style={styles.icon} source={icons[name]} resizeMode='contain' />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
