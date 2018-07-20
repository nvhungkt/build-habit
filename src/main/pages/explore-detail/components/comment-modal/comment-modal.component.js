import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'native-base';

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

  render() {
    return (
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
    );
  }
}
