// src/components/Dashboard/DashboardHeader.tsx

import { useTheme } from "../../contexts/Theme/themeContext";
import { useAuth } from "../../hooks/Auth/useAuth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { Row } from "../Form/Row";

interface DashboardHeaderProps {
  Titulo?: string;
  Subtitulo?: string;
  navigation: any;
}

export function DashboardHeader({
  Titulo,
  Subtitulo,
  navigation,
}: DashboardHeaderProps) {
  const { theme } = useTheme();
  const { user, logout } = useAuth();

  const roleFormatada = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "";

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
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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
            <Text style={{ fontWeight: "bold", color: theme.colors.text }}>
              {Titulo ? Titulo : `Bem-vindo, ${user?.nome || "Usuário"}`}
            </Text>
            <Text style={{ color: theme.colors.destaque }}>
              {Subtitulo || roleFormatada}
            </Text>
          </View>
        </View>

        <Row>
          <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
            <MaterialCommunityIcons
              name="cog"
              size={22}
              color={theme.colors.text}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={logout}>
            <MaterialCommunityIcons
              name="logout"
              size={22}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        </Row>
      </View>
    </View>
  );
}
