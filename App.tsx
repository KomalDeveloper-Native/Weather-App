/* eslint-disable react/jsx-no-undef */
// App.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './src/Navigation/AppNavigation';
import {NewsProvider} from './context/NewsContext';
import {WeatherProvider} from './context/WeatherContext';
import {PreferencesProvider} from './context/PreferenceContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { colors } from './src/styles/colors';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.secondary}}>
        <PreferencesProvider>
          <WeatherProvider>
            <NewsProvider>
              <NavigationContainer>
                <AppNavigation />
              </NavigationContainer>
            </NewsProvider>
          </WeatherProvider>
        </PreferencesProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
