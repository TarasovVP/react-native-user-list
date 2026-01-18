import React from 'react';
import { UsersScreen } from './src/features/users/screens/UsersScreen';
import { AppContainerProvider } from './src/di/AppContainer';

const App = () => {
  return (
    <AppContainerProvider>
    <UsersScreen />
  </AppContainerProvider>
  );
};

export default App;