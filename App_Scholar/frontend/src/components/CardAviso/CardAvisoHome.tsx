import React from "react";

import {
  TouchableOpacity,
  View,
  Text,
} from "react-native";

import {
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { useTheme } from "../../contexts/Theme/themeContext";

export function CardAvisoHome({
  aviso,
  onPress,
}: any) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor:
          theme.colors.warning + "20",

        borderWidth: 1,

        borderColor:
          theme.colors.warning,

        borderRadius: 14,

        padding: 16,

        marginBottom: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name="bullhorn"
          size={24}
          color={
            theme.colors.warning
          }
        />

        <Text
          style={{
            marginLeft: 10,

            fontWeight: "700",

            color:
              theme.colors.text,

            flex: 1,
          }}
        >
          {aviso.avisoTitulo}
        </Text>
      </View>

      <Text
        numberOfLines={2}
        style={{
          marginTop: 8,

          color:
            theme.colors.text,
        }}
      >
        {aviso.avisoMensagem}
      </Text>

      <Text
        style={{
          marginTop: 10,

          fontWeight: "600",

          color:
            theme.colors.primary,
        }}
      >
        Toque para visualizar
      </Text>
    </TouchableOpacity>
  );
}