import React from 'react';
import { View, Image } from 'react-native';
import { Content, Button, Text, Icon } from 'native-base';

import icons from '../../assets/icon-index';

import { styles, textStyles } from './detail.style';
import { convertHabitDetail } from './detail.utility';

// const habit = {
//   title: 'Have breakfast',
//   description: 'Breakfast is the most important meal in a whole day, provide you energy for a long working day',
//   icon: 'breakfast',
//   scheduler: 'Every Mon, Tue, Wed, Thu, Fri',
//   timeRange: '06:00 - 07:00'
// };

export default class Detail extends React.Component {
  static navigationOptions = () => {
    return {
      title: 'Detail',
      headerTitleStyle: styles.title,
      headerRight: (
        <React.Fragment>
          <Button transparent>
            <Icon style={{color: 'black'}} name='md-trash' />
          </Button>
          <Button transparent>
            <Icon style={{color: 'black'}} name='md-create' />
          </Button>
        </React.Fragment>
      ),
      headerRightStyle: {
        flex: 1,
        alignItems: 'center'
      }
    };
  }

  render() {
    const habit = this.props.habit.schedule ? convertHabitDetail(this.props.habit) : {};

    return (
      <React.Fragment>
        <Content style={styles.container}>
          {habit && (
            <View style={styles.content}>
              <Image style={styles.icon} source={icons[habit.icon]} resizeMode='contain' />
              <Text style={textStyles.title}>{habit.title}</Text>
              <Text style={textStyles.description}>{habit.description}</Text>
              <Text style={textStyles.scheduler}>{habit.scheduler}</Text>
              <Text style={textStyles.time}>{habit.timeRange}</Text>
            </View>
          )}
        </Content>
        <View style={styles.actions}>
          <View>
            <Button style={styles.close} rounded>
              <Icon style={textStyles.actionIcon} name='md-close' />
            </Button>
          </View>
          <View>
            <Button style={styles.done} rounded>
              <Icon style={textStyles.actionIcon} name='md-checkmark' />
            </Button>
          </View>
        </View>
      </React.Fragment>
    );
  }
}
