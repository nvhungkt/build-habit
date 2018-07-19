import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Content, Button, Text } from 'native-base';

import { getToken } from '../../sqlite/token.storage';

import HabitTag from './components/habit-tag';
import { styles, textStyles } from './add-activity.style';

export default class AddActivity extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add new habit',
      headerTitleStyle: styles.title,
      headerRight: (
        <Button style={{ height: 54 }} onPress={() => navigation.push('AddActivityDetail')} transparent>
          <Text style={textStyles.themeText}>CREATE</Text>
        </Button>
      )
    };
  }

  componentDidMount() {
    this.getToken();
  }

  getToken = async () => {
    this.token = await getToken();
    this.props.getAllTemplatesByTags && this.props.getAllTemplatesByTags(this.token);
  }

  render() {
    const { tags, navigation } = this.props;

    return (
      <Content style={styles.container}>
        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={() => navigation.push('AddActivityDetail')}
        >
          <Text style={{
            color: '#E91E63',
            fontWeight: 'bold',
            alignSelf: 'center',
            flex: 1,
            padding: 8,
            borderColor: '#E91E63',
            borderWidth: 1,
            borderRadius: 20
          }}>
            CREATE YOUR OWN HABIT
          </Text>
        </TouchableOpacity>
        {tags.map((tag, index) =>
          <HabitTag navigation={navigation} key={index} name={tag.tagName} habits={tag.habits} />
        )}
      </Content>
    );
  }
}
