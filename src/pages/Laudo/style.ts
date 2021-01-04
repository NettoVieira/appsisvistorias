import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 50px;
  padding: 0 20px;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 48px;
  border: #00c853;
  background-color: #fff;
  color: #333;
  margin: 8px;
  border-radius: 5px;
  font-family: 'Roboto-Regular';
`;

export const ComboBoxButton = styled.View`
  border: #00c853;
  border-radius: 5px;
  width: 100%;
  margin: 5px;
  background-color: #fff;
`;

export const ComboBox = styled.Picker`
  width: 100%;
  border-radius: 10px;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  border-radius: 10px;
  height: 45px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  background: #00c853;
`;

export const ButtonText = styled.Text`
  align-items: center;
  justify-content: center;
  font-size: 25px;
  color: #fff;
  font-family: 'Ubuntu-Bold';
`;

export const ComboBoxItem = styled.Picker`
  width: 100%;
  font-family: 'Ubuntu-Bold';
`.Item;
