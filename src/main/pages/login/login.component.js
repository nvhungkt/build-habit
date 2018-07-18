import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Content, Item, Label, Input, Button, Text } from 'native-base';

import { saveToken } from '../../sqlite/token.storage';

import { styles } from './login.style';

export default class Login extends React.Component {
  static navigationOptions = {
    title: 'Login',
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoginPage: true,
      username: '',
      password: '',
      confirm: '',
      name: '',
      email: ''
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.token && this.props.token) {
      this.saveToken();
    }
  }

  saveToken = async () => {
    await saveToken(this.props.token, this.props.username);
    this.props.navigation.navigate('Home');
  }

  toggleMode = () => {
    const { isLoginPage } = this.state;

    this.setState({ isLoginPage: !isLoginPage });
  }

  handleTextInput = (value, field) => this.setState({ [field]: value });

  handleSubmit = () => {
    const { isLoginPage, username, password, confirm, name, email } = this.state;

    if (isLoginPage) {
      this.props.login && this.props.login(username, password);
    } else if (password === confirm) {
      // eslint-disable-next-line
      alert(username + password + confirm + name + email);
    } else {
      // eslint-disable-next-line
      alert('Wrong confirm password');
    }
  }

  render() {
    const { isLoginPage, username, password, confirm, name, email } = this.state;

    return (
      <Content style={styles.container}>
        <View style={styles.content}>

          <Item style={styles.row} floatingLabel>
            <Label style={styles.input}>Username</Label>
            <Input onChangeText={value => this.handleTextInput(value, 'username')} value={username} />
          </Item>

          <Item style={styles.row} floatingLabel>
            <Label style={styles.input}>Password</Label>
            <Input
              secureTextEntry={true}
              onChangeText={value => this.handleTextInput(value, 'password')}
              value={password}
            />
          </Item>

          {isLoginPage ? null : (
            <Item style={styles.row} floatingLabel>
              <Label style={styles.input}>Confirm Password</Label>
              <Input
                secureTextEntry={true}
                onChangeText={value => this.handleTextInput(value, 'confirm')}
                value={confirm}
              />
            </Item>
          )}

          {isLoginPage ? null : (
            <Item style={styles.row} floatingLabel>
              <Label style={styles.input}>Full name</Label>
              <Input onChangeText={value => this.handleTextInput(value, 'name')} value={name} />
            </Item>
          )}

          {isLoginPage ? null : (
            <Item style={styles.row} floatingLabel>
              <Label style={styles.input}>Email</Label>
              <Input onChangeText={value => this.handleTextInput(value, 'email')} value={email} />
            </Item>
          )}

          <Button style={styles.row} onPress={this.handleSubmit} rounded>
            <Text>{isLoginPage ? 'LOGIN' : 'SIGN UP'}</Text>
          </Button>

          <TouchableOpacity style={styles.row} onPress={this.toggleMode} transparent>
            <Text>{isLoginPage ? 'Create new account' : 'Login with existed account'}</Text>
          </TouchableOpacity>

        </View>
      </Content>
    );
  }
}
