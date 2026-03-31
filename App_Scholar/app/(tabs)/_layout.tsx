import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HapticTab } from '../../src/components/haptic-tab';
import { useTheme } from '../../src/contexts/Theme/themeContext';

export default function TabLayout() {
  // const colorScheme = useColorScheme();
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.activeTab,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarInactiveTintColor: theme.colors.inactiveTab
      }}
    >
      {/* Home */}
     <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="cadastros"
        options={{
          title: 'Cadastros',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard-text" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="config"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />

      {/* Aluno */}
      {/* {isAluno && (
        <Tabs.Screen name="boletim" options={{ title: 'Boletim' }} />
      )} */}

      {/* Professor */}
      {/* {isProfessor && (
        <Tabs.Screen name="notas" options={{ title: 'Notas' }} />
      )} */}

      {/* Admin */}
      {/* {isAdmin && (
        <Tabs.Screen name="usuarios" options={{ title: 'Usuários' }} />
      )} */}
    </Tabs>
  );
}