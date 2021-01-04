import 'react-native-gesture-handler';
import React from 'react';
import {View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppLogin from './hooks';

import Routes from './routes';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
    <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <AppLogin>
        <Routes />
      </AppLogin>
    </View>
  </NavigationContainer>
);

export default App;
