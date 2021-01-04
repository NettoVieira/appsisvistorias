import styled, {css} from 'styled-components/native';
import {Items} from './index';
import {FlatList, TouchableOpacity} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  flex: 1;
  margin-top: 30px;
`;

export const Scroll = styled.ScrollView`
  flex: 1;
  margin-top: 12px;
`;

export const Title = styled.Text`
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: #212121;
  font-family: 'Ubuntu-Bold';
  margin-bottom: 80px;
`;

export const ItemsList = styled(FlatList as new () => FlatList<Items>)`
  padding: 8px 3px 2px;
`;

export const ItemContainer = styled(TouchableOpacity)`
  background: #fff;
  flex: 1;
  margin: 1px;
  height: 150px;
  border-radius: 5px;
  border: #34cb79;
`;

export const ImageItem = styled.Image`
  flex: 1;
  border-radius: 2px;
`;

export const ItemHeader = styled.View`
  background-color: 'rgba(52,203,121,1)';
`;

export const ItemText = styled.Text`
  font-size: 13px;
  font-family: 'Ubuntu-Bold';
  text-align: center;
  margin-left: 2px;
  color: #fff;

  ${(props) =>
    props.children[0] &&
    css`
      color: #d50000;
    `}
`;

export const ItemFooter = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: 'rgba(169,169,169,0.5)';

  height: 30px;
  border-radius: 5px;
`;

export const ItemRodaPe = styled.View`
  justify-content: center;
  align-items: center;

  margin-bottom: 10px;
  height: 30px;
  border-radius: 5px;
`;

export const ItemFooterText = styled.Text`
  font-family: 'Ubuntu-Bold';
`;

export const ItemButtonFooter = styled.TouchableOpacity`
  background-color: #00c853;
  width: 98%;
  height: 45px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const ItemButtonFooterText = styled.Text`
  font-size: 20px;
  color: #fff;
  font-family: 'Ubuntu-Bold';
`;

export const Icon = styled(FeatherIcon)``;
