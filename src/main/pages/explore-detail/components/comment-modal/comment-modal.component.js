import React from 'react';
import { ScrollView, View, Keyboard } from 'react-native';
import { Text, Item, Input, Icon } from 'native-base';

import { styles, textStyles } from './comment-modal.style';

const comments = [
  {
    name: 'nguyen.viet.hung',
    content: 'It looks like that you do it very well'
  },
  {
    name: 'bach.minh.nam',
    content: "That's great, I will follow you!"
  }
];

export default class CommentModal extends React.Component {

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
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={textStyles.title}>Comment</Text>
          </View>
          <View style={styles.body}>
            <ScrollView>
              {comments.map((comment, index) => (
                <View style={{
                  marginRight: 20,
                  marginLeft: 20,
                  marginBottom: 20,
                  paddingBottom: 20,
                  paddingRight: 20,
                  borderBottomWidth: 0.5,
                  borderColor: '#ccc'
                }} key={index}>
                  <Text style={{ fontWeight: 'bold' }}>{comment.name}</Text>
                  <Text>   {comment.content}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
        <View style={{ ...styles.search, bottom: 0 }}>
          <View style={styles.row}>
            <Item style={{ flex: 1 }}>
              <Input placeholder="Comment" />
            </Item>
            <Icon style={{ marginTop: 10, color: '#424242' }} name="md-send" />
          </View>
        </View>
      </React.Fragment>
    );
  }
}
