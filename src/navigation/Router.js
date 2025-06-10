import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import useAuth from '../hooks/useAuth'; 
import AuthStack from './AuthStack';
import MainStack from './MainStack';

const Router = () => {
  const { user } = useAuth(); 

  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;