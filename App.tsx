import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { AuthProvider } from './navigation/AuthProvider';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: "rgba(235, 87, 87, 1)",
      accent: '#f1c40f',
    },
  };


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <AuthProvider>
            <Navigation colorScheme={colorScheme} />
            {/* <StatusBar /> */}
          </AuthProvider>
        </PaperProvider>
      </SafeAreaProvider>
    );
  }
}
