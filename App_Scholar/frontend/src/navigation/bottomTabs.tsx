// src/routes/BottomTabs.tsx
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "../contexts/Theme/themeContext";

import Config from "../screens/Home/config";
import Home from "../screens/Home/home";

const Tab = createBottomTabNavigator();

export function BottomTabs() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Esconde o header padrão da aba
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarStyle: {
          backgroundColor: theme.colors.backgroundCard,
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Início",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Config"
        component={Config}
        options={{
          tabBarLabel: "Configurações",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />
      {/* Adicione outras abas aqui no futuro (Perfil, Configurações, etc) */}
      {/* <Tab.Screen name="PerfilTab" component={Perfil} ... /> */}
    </Tab.Navigator>
  );
}
