import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HapticTab } from '../../src/components/haptic-tab';
import { useTheme } from '../../src/contexts/Theme/themeContext';

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
  screenOptions={{
    headerShown: false,
    tabBarButton: HapticTab,

    tabBarActiveTintColor: theme.colors.activeTab,
    tabBarInactiveTintColor: theme.colors.inactiveTab,

    tabBarStyle: {
      position: "absolute",
      backgroundColor: theme.colors.background,
      borderTopWidth: 0,

      elevation: 8, 
      height: 50,
    },

    tabBarLabelStyle: {
      fontSize: 10,
      fontWeight: "500",
    },
  }}
>
  
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
        name="config"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />

    </Tabs>
  );
}