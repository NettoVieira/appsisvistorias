import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Title = styled.Text`
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: #212121;
  font-family: 'Ubuntu-Bold';
  margin-bottom: 40px;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  border: #00c853;
  border-radius: 98px;
`;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;

  align-self: center;
`;

export const Label = styled.Text`
  font-family: 'Ubuntu-Bold';
  font-size: 20px;
  margin-top: 10px;
`;

export const Footer = styled.View`
  margin-top: 200px;
  align-items: center;
  justify-content: center;
`;

export const TextFooter = styled.Text`
  color: #888;
  font-family: 'Ubuntu-Bold';
  font-size: 14px;
`;

export const ParamButton = styled(RectButton)`
  background-color: #00c853;
  width: 100%;
  height: 45px;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const ParamButtonText = styled.Text`
  font-size: 20px;
  color: #fff;
  font-family: 'Ubuntu-Bold';
`;
