// src/components/Dashboard/DashboardHeader.tsx

import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/src/contexts/Theme/themeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '@/src/hooks/Auth/useAuth';

interface DashboardHeaderProps {
  Titulo?: string;
  Subtitulo?: string;
}

export function DashboardHeader({ Titulo, Subtitulo }: DashboardHeaderProps) {
  const { theme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <View
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderColor: theme.colors.destaque,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
   
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: theme.colors.primary,
              padding: 10,
              borderRadius: 10,
              marginRight: 10,
            }}
          >
            <MaterialCommunityIcons
              name="school"
              size={20}
              color={theme.colors.text}
            />
          </View>

          <View>
            <Text style={{ fontWeight: 'bold', color: theme.colors.text }}>
              {Titulo ? Titulo : `Bem-vindo, ${user?.nome || 'Usuário'}`}
            </Text>
            <Text style={{ color: theme.colors.destaque }}>
              {Subtitulo ? Subtitulo : user?.role}
            </Text>
          </View>
        </View>

  
        <TouchableOpacity onPress={logout}>
          <MaterialCommunityIcons
            name="logout"
            size={22}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}