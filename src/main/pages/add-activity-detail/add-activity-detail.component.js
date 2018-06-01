import React from 'react';
import { Content, Button, Text } from 'native-base';

export default class AddActivityDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Create new habit',
      headerTitleStyle: { alignSelf: 'center' },
      headerRight: (
        <Button transparent onPress={() => navigation.navigate('Home')}>
          <Text style={{ color: '#e91e63' }}>DONE</Text>
        </Button>
      )
    };
  }

  render() {
    return (
      <React.Fragment>
        <Content>

        </Content>
      </React.Fragment>
    );
  }
}
