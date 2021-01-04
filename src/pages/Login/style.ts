import styled from 'styled-components/native';

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
  margin-bottom: 80px;
`;

export const Label = styled.Text`
  font-family: 'Ubuntu-Bold';
  font-size: 20px;
  margin-top: 10px;
`;

export const Change = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 18px;
  margin-top: 10px;
  color: #01579b;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
  align-items: center;
`;

export const ForgotPasswordText = styled.Text`
  font-size: 18px;
  font-family: 'Roboto-Regular';
  color: #757575;
`;

export const Footer = styled.View`
  margin-top: 200px;
`;

export const FooterText = styled.Text`
  font-family: 'Ubuntu-Bold';
  font-size: 16px;
  color: #9e9e9e;
`;
