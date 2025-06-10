import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { signOut } from 'firebase/auth'; 
import { auth } from '../services/firebaseConfig';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Drawer = createDrawerNavigator();

const LogoutComponent = () => null;

const AppDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Início" component={HomeScreen} />
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
      <Drawer.Screen 
        name="Sair" 
        component={LogoutComponent}
        options={{
          drawerLabel: 'Sair'
        }}
        listeners={{
          drawerItemPress: (e) => {
            e.preventDefault();
            signOut(auth);
          },
        }} 
      />
    </Drawer.Navigator>
  );
};

export default AppDrawer;