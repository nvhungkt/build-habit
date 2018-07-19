import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import { Text, Button } from 'native-base';

import Habit from './components/habit';

import avatar from '../../../../assets/avatar.png';

import { styles, textStyles } from './user.style';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      follow: this.props.follow || false
    };
  }

  render() {
    const { name, habits } = this.props.user;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.user}>
          <Image style={styles.icon} source={avatar} resizeMode='contain' />
          <View style={styles.information}>
            <Text style={textStyles.name}>{name}</Text>
            {this.state.follow
              ?
              <Button style={styles.buttonActive} onPress={() => this.setState({ follow: false })}>
                <Text>Follow</Text>
              </Button>
              :
              <Button style={styles.buttonNotActive} onPress={() => this.setState({ follow: true })} bordered>
                <Text style={textStyles.buttonNotActive}>Follow</Text>
              </Button>
            }
          </View>
        </TouchableOpacity>
        { habits.map((habit, index) => <Habit navigation={this.props.navigation} habit={habit} key={index} />)}
      </View>
    );
  }
}
