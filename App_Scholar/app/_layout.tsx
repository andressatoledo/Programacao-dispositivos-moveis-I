import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { ThemeProvider } from '../src/contexts/Theme/themeContext';
import { useColorScheme } from '../src/hooks/use-color-scheme';
import { AuthProvider } from '@/src/contexts/Auth/authContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
    <ThemeProvider>
      {/* <Stack> */}
        {/* <Stack.Screen name="app/(tabs)/_layout" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
      <Stack />
      <StatusBar style="auto" />
    </ThemeProvider>
    </AuthProvider>
  );
}
