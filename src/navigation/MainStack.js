import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppTabs from './AppTabs';
import GameDetailsScreen from '../screens/GameDetailsScreen';
import ListDetailsScreen from '../screens/ListDetailsScreen';
import MyListsScreen from '../screens/MyListsScreen';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1e1e1e' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="AppTabs" component={AppTabs} options={{ headerShown: false }} />
      <Stack.Screen name="GameDetails" component={GameDetailsScreen} options={{ title: 'Detalhes do Jogo' }} />
      <Stack.Screen name="ListDetails" component={ListDetailsScreen} options={({ route }) => ({ title: route.params.listName })} />
      <Stack.Screen name="MyLists" component={MyListsScreen} options={{ title: 'Minhas Listas' }} />
    </Stack.Navigator>
  );
};

export default MainStack;