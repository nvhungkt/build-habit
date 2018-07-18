import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Content, Text, Icon } from 'native-base';

import { styles, textStyles } from './sidebar.style';

const menus = [
  [
    {
      title: 'My habits and activities',
      icon: 'md-apps',
      page: 'Home'
    },
    {
      title: 'My notifications',
      icon: 'md-notifications',
      page: 'Notifications'
    }
  ],
  [
    {
      title: 'Home',
      icon: 'md-home',
      page: 'Home'
    },
    {
      title: 'Add habit',
      icon: 'md-add',
      page: 'AddActivity'
    }
  ],
  [
    {
      title: 'Account',
      icon: 'md-contact',
      page: 'Home'
    },
    {
      title: 'Log out',
      icon: 'md-exit',
      page: 'Login'
    }
  ],
  [
    {
      title: 'Settings',
      icon: 'md-settings',
      page: 'Home'
    },
    {
      title: 'About us',
      icon: 'md-information-circle',
      page: 'Home'
    }
  ]
];

export default class SideBar extends React.Component {

  render() {
    return (
      <Content style={styles.sidebar}>
        {menus.map((block, index) => (
          <View style={styles.block} key={index}>

            {block.map((item, itemIndex) => (
              <TouchableOpacity
                style={styles.row}
                key={itemIndex}
                onPress={() => this.props.navigation.push(item.page)}
              >
                <View style={styles.iconContainer}>
                  <Icon style={styles.icon} name={item.icon} />
                </View>

                <View style={styles.menuItem}>
                  <Text style={textStyles.menuItem}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}

          </View>
        ))}
      </Content>
    );
  }
}
