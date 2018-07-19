import React from 'react';
import { KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native';
import { Content, Item, Label, Input, Button, Text } from 'native-base';

import { saveToken } from '../../sqlite/token.storage';
import logo from '../../assets/logo.png';

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
    const { token, username, password } = this.props;

    if (!prevProps.token && token) {
      this.saveToken();
    } else if (!prevProps.username && username) {
      this.props.login && this.props.login(username, password);
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
      this.props.signUp && this.props.signUp({ username, password, name, email });
    } else {
      // eslint-disable-next-line
      alert('Wrong confirm password');
    }
  }

  render() {
    const { isLoginPage, username, password, confirm, name, email } = this.state;

    return (
      <Content style={styles.container}>
        <KeyboardAvoidingView style={styles.content} behavior='padding'>

          <Image style={styles.logo} source={logo} resizeMode='contain' />
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

          <Button style={styles.button} onPress={this.handleSubmit} rounded>
            <Text>{isLoginPage ? 'LOGIN' : 'SIGN UP'}</Text>
          </Button>

          <TouchableOpacity style={styles.row} onPress={this.toggleMode} transparent>
            <Text style={styles.link}>{isLoginPage ? 'Create new account' : 'Login with existed account'}</Text>
          </TouchableOpacity>

        </KeyboardAvoidingView>
      </Content>
    );
  }
}
