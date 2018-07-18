import { AsyncStorage } from 'react-native';

export const saveToken = async (token, username) => {
  await AsyncStorage.clear();
  await AsyncStorage.setItem('token', token);
  await AsyncStorage.setItem('username', username);
};

export const getToken = async () => {
  const token = await AsyncStorage.getItem('token');
  const username = await AsyncStorage.getItem('username');

  return { token, username };
};
