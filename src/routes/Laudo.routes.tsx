import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Laudo from '../pages/Laudo';
import LaudoAndamento from '../pages/LaudoAndamento';
import Icon from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

const LaudoRoutes: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        cardStyle: {backgroundColor: '#f5f5f5'},
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          let iconName;

          switch (route.name) {
            case 'Novo':
              iconName = 'file-plus';
              break;
            case 'Em andamento':
              iconName = 'file-text';
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
      <Tab.Screen name="Novo" component={Laudo} />
      <Tab.Screen name="Andamento" component={LaudoAndamento} />
    </Tab.Navigator>
  );
};

export default LaudoRoutes;
