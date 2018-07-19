import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Content, Text, Icon } from 'native-base';

import { styles, textStyles } from './sidebar.style';

const menus = [
  [
    {
      title: 'Explore',
      icon: 'md-paper-plane',
      action: 'push',
      page: 'Explore',
      params: {}
    },
    {
      title: 'My habits and activities',
      icon: 'md-apps',
      action: 'push',
      page: 'Home',
      params: {}
    },
    {
      title: 'My notifications',
      icon: 'md-notifications',
      action: 'push',
      page: 'Notifications',
      params: {}
    }
  ],
  [
    {
      title: 'Home',
      icon: 'md-home',
      action: 'navigate',
      page: 'Home',
      params: {}
    },
    {
      title: 'Add habit',
      icon: 'md-add',
      action: 'push',
      page: 'AddActivity',
      params: {}
    }
  ],
  [
    {
      title: 'Account',
      icon: 'md-contact',
      action: 'push',
      page: 'Home',
      params: {}
    },
    {
      title: 'Log out',
      icon: 'md-exit',
      action: 'navigate',
      page: 'Login',
      params: {}
    }
  ],
  [
    {
      title: 'Settings',
      icon: 'md-settings',
      action: 'push',
      page: 'Home',
      params: {}
    },
    {
      title: 'About us',
      icon: 'md-information-circle',
      action: 'push',
      page: 'Home',
      params: { reload: true }
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
                onPress={() => this.props.navigation[item.action](item.page, item.params)}
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
