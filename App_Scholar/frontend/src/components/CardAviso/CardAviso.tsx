import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { useTheme } from "../../contexts/Theme/themeContext";

export function CardAviso({
  item,
  onPress,
}: any) {
  const { theme } = useTheme();

  
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor:
          theme.colors.backgroundCard,

        borderRadius: 14,

        padding: 16,

        marginBottom: 12,

        borderLeftWidth: 4,

        borderLeftColor:
          theme.colors.warning,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
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
            flex: 1,

            marginLeft: 10,

            fontWeight: "700",

            fontSize: 16,

            color:
              theme.colors.text,
          }}
        >
          {item.avisoTitulo}
        </Text>

        <View
          style={{
            backgroundColor:
              theme.colors.error,

            borderRadius: 12,

            paddingHorizontal: 8,

            paddingVertical: 2,
          }}
        >
          <Text
            style={{
              color: "#FFF",

              fontSize: 10,

              fontWeight: "700",
            }}
          >
            NOVO
          </Text>
        </View>
      </View>

      <Text
        numberOfLines={2}
        style={{
          color:
            theme.colors.opaco,

          marginBottom: 10,
        }}
      >
        {item.avisoMensagem}
      </Text>

     
    </TouchableOpacity>
  );
}