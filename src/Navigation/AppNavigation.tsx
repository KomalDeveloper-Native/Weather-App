import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../Componets/container/Welcome';
import HomeScreen1 from '../Componets/Pages/Home/HomeScreen1';
import SettingsScreen from '../Componets/Pages/Setting/SettingScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={'Welcome'}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="HomeScreen1" component={HomeScreen1} />
      <Stack.Screen name="Settings" component={SettingsScreen} />

    </Stack.Navigator>
  );
};

export default AppNavigation;
