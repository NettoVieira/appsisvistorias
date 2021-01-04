import React, {useCallback} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import {Container, Buttons} from './style';
import {useNavigation} from '@react-navigation/native';

import LaudoDetalhe from './LaudoDetalhes.routes';

import LaudoRoutes from './Laudo.routes';
import Userinfo from '../pages/Userinfo';
import {useAuth} from '../hooks/auth';

const App = createStackNavigator();

const ProfileLogin: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Buttons
      onPress={() => {
        navigation.navigate('Userinfo');
      }}>
      <Icon name="user" size={24} color="#555" />
    </Buttons>
  );
};

const AppRoutes: React.FC = () => {
  const {signOut} = useAuth();

  const handleLogout = useCallback(async () => {
    await signOut();
  }, [signOut]);

  return (
    <App.Navigator
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerTitle: '',
        headerLeft: () => (
          <Container>
            <ProfileLogin />
          </Container>
        ),
        headerRight: () => (
          <Container>
            <Buttons
              onPress={() => {
                handleLogout();
              }}>
              <Icon name="log-out" size={24} color="#555" />
            </Buttons>
          </Container>
        ),
        cardStyle: {backgroundColor: '#f5f5f5'},
      }}>
      <App.Screen name="Laudo" component={LaudoRoutes} />
      <App.Screen name="LaudoDetalhe" component={LaudoDetalhe} />
      <App.Screen name="Userinfo" component={Userinfo} />
    </App.Navigator>
  );
};

export default AppRoutes;
