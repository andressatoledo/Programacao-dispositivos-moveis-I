import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Form } from "@/src/components/Form/Form";

import { useAuth } from "@/src/hooks/Auth/useAuth";

import { useTheme } from "@/src/contexts/Theme/themeContext";
import { RootStackParamList } from "@/src/navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export function PerfilScreen() {
  const { user } = useAuth();


   type NavProp =
  NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavProp>();

  const { theme } = useTheme();

  const primeiraLetra =
    user?.nome?.charAt(0)?.toUpperCase() || "U";

  return (
    <Form>
      <View
        style={{
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 999,

            backgroundColor:
              theme.colors.primary,

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              color: theme.colors.background,
            }}
          >
            {primeiraLetra}
          </Text>
        </View>

        <Text
          style={{
            marginTop: 16,
            fontSize: 22,
            fontWeight: "bold",
            color: theme.colors.text,
          }}
        >
          {user?.nome}
        </Text>

        <Text
          style={{
            marginTop: 4,
            color: theme.colors.destaque,
          }}
        >
          {user?.email}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("MudarSenha")
        }
        style={{
          marginTop: 40,
          padding: 16,
          borderRadius: 12,

          backgroundColor:
            theme.colors.primary,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: theme.colors.background,
          }}
        >
          Mudar senha
        </Text>
      </TouchableOpacity>
    </Form>
  );
}