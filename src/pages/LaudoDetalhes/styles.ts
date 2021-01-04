import styled from 'styled-components/native';
import {TextInput} from 'react-native-paper';
import {RectButton} from 'react-native-gesture-handler';
export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

export const Scroll = styled.ScrollView`
  padding: 0 20px;
  width: 100%;
`;

export const Input = styled(TextInput)`
  width: 95%;
  height: 48px;
  border: #00c853;
  background-color: #fff;
  color: #333;
  margin: 8px;
  border-radius: 5px;
  font-family: 'Roboto-Regular';
`;

export const Button = styled(RectButton)`
  background-color: #00c853;
  width: 85%;
  height: 45px;

  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;
export const ButtonText = styled.Text`
  font-size: 20px;
  color: #fff;
  font-family: 'Ubuntu-Bold';
`;
