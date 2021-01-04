import React from 'react';

import {AuthProvider} from './auth';

const AppLogin: React.FC = ({children}) => (
  <AuthProvider>{children}</AuthProvider>
);

export default AppLogin;
