import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Feather';
import DetalheLaudo from '../pages/LaudoDetalhes';
import DetalheFotos from '../pages/LaudoDetalhesFotos';
import DetalheItens from '../pages/LaudoDetalhesItens';

const Tab = createBottomTabNavigator();

const LaudoDetalhes: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        cardStyle: {backgroundColor: '#f5f5f5'},
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          let iconName;

          switch (route.name) {
            case 'Detalhes Veiculos':
              iconName = 'list';
              break;
            case 'Fotos':
              iconName = 'camera';
              break;
            case 'Itens Verificados':
              iconName = 'check-circle';
              break;
            default:
              iconName = 'list';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#00c853',
        inactiveTintColor: '#777',
        labelStyle: {
          fontSize: 12,
          fontFamily: 'Roboto-Regular',
          margin: 2,
        },
      }}>
      <Tab.Screen name="Veiculo" component={DetalheLaudo} />
      <Tab.Screen name="Fotos" component={DetalheFotos} />
      <Tab.Screen name="Itens Verificados" component={DetalheItens} />
    </Tab.Navigator>
  );
};

export default LaudoDetalhes;
