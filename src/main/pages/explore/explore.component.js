import React from 'react';
import { View, Keyboard } from 'react-native';
import { Content, Item, Input, Icon } from 'native-base';

import User from './components/user';

import { styles } from './explore.style';

const users = [
  {
    name: 'nguyen.viet.hung',
    habits: [
      {
        icon: 'dumbbell',
        name: 'Go to the gym',
        level: 'experience',
        description: 'For a perfect body'
      },
      {
        icon: 'breakfast',
        name: 'Have breakfast',
        level: 'expert',
        description: 'Breakfast provides energy for a whole morning'
      },
      {
        icon: 'radio',
        name: 'Learn English',
        level: 'beginner',
        description: 'Practice listening skills'
      }
    ]
  },
  {
    name: 'bach.minh.nam',
    habits: [
      {
        icon: 'green-leaf',
        name: 'Water the tree',
        level: 'fluency',
        description: 'Take care of plants'
      },
      {
        icon: 'breakfast',
        name: 'Have breakfast',
        level: 'expert',
        description: 'Breakfast provides energy for a whole morning'
      },
      {
        icon: 'ping-pong',
        name: 'Play ping pong',
        level: 'not-ranking',
        description: 'Practice with brothers'
      }
    ]
  },
  {
    name: 'the.gym.guy',
    habits: [
      {
        icon: 'dumbbell',
        name: 'Go to the gym',
        level: 'experience',
        description: 'For a perfect body'
      },
      {
        icon: 'alarm-clock',
        name: 'Wake up early',
        level: 'master',
        description: 'Wake up early is good for your health'
      },
      {
        icon: 'apple',
        name: 'Have fruits',
        level: 'expert',
        description: 'Fruits are good for fitness'
      }
    ]
  }
];

export default class Explore extends React.Component {
  static navigationOptions = {
    title: 'Explore',
    headerTitleStyle: styles.title
  }

  constructor(props) {
    super(props);
    this.state = {
      keyboardHeight: 0
    };
  }

  componentDidMount() {
    this.keyBoardShowListener = Keyboard.addListener('keyboardDidShow', this.handleKeyboardShow);
    this.keyBoardHideListener = Keyboard.addListener('keyboardDidHide', this.handleKeyboardHide);
  }

  componentWillUnmount() {
    this.keyBoardShowListener.remove();
    this.keyBoardHideListener.remove();
  }

  handleKeyboardShow = event => {
    this.setState({
      keyboardHeight: event.endCoordinates.height
    });
  }

  handleKeyboardHide = () => {
    this.setState({
      keyboardHeight: 0
    });
  }

  render() {
    return (
      <React.Fragment>
        <Content style={styles.container}>
          {users.map((user, index) => <User navigation={this.props.navigation} user={user} key={index} />)}
          <View style={{ height: 60, width: 100 }}>
          </View>
        </Content>
        <View style={{ ...styles.search, bottom: this.state.keyboardHeight }}>
          <View style={styles.row}>
            <Item style={{ flex: 1 }}>
              <Input placeholder="Search" />
            </Item>
            <Icon style={{ marginTop: 10, color: '#424242' }} name="md-search" />
          </View>
        </View>
      </React.Fragment>
    );
  }
}
