import styled from 'styled-components/native';
import {Items} from './index';
import {FlatList, TouchableOpacity} from 'react-native';

export const Container = styled.View`
  flex: 1;
  margin-top: 30px;
`;

export const ItemsList = styled(FlatList as new () => FlatList<Items>)`
  padding: 32px 24px 16px;
`;

export const ItemContainer = styled(TouchableOpacity)`
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  border: #34cb79;
  align-items: center;
`;
export const ItemInfo = styled.View`
  margin-left: 20px;
`;

export const Scroll = styled.ScrollView`
  flex: 1;
  margin-top: 12px;
`;

export const ItemTitle = styled.Text`
  font-family: 'Ubuntu-Bold';
  font-size: 18px;
  align-items: center;
  color: #333;
`;
export const ItemMeta = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`;

export const Label = styled.Text`
  font-family: 'Ubuntu-Bold';
  color: #555;
`;
export const ItemText = styled.Text`
  margin-left: 8px;
  font-family: 'Roboto-Regular';
  color: #555;
`;
