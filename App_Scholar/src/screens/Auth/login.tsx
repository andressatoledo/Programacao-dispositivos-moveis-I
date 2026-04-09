import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../../hooks/Auth/useAuth";
// ❌ APAGADO: import { useRouter } from "expo-router";
import { InputField } from "../../components/Form/InputField";
import { Button } from "../../components/Form/Button";
import { Controller } from "react-hook-form";
import { useLoginScreen } from "../../hooks/Auth/useLoginScreen";
import { Form } from "../../components/Form/Form";
import { useTheme } from "@/src/contexts/Theme/themeContext";
import { useState } from "react";

export default function LoginScreen() {
  const { login } = useAuth();
  const { theme } = useTheme();
  const [secure, setSecure] = useState(true);
  const { control, errors, handleSubmit } = useLoginScreen();

  const [role, setRole] = useState<"aluno" | "professor" | "admin">("aluno");

  function handleLogin() {
  
    login({
      user: {
        usuarioId: "1",
        usuarioNome: "Andressa",
        usuarioLogin: "andressa",
        usuarioSenha: "123",
        usuarioRole: role,
      },
      token: "123",
    });

  }

  return (
    <Form>
      <View style={{ alignItems: "center", marginBottom: 30 }}>
        <Text
          style={{ fontSize: 22, fontWeight: "bold", color: theme.colors.text }}
        >
          App Scholar
        </Text>
        <Text style={{ color: theme.colors.destaque }}>
          Gerenciamento de Boletim Acadêmico 
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          backgroundColor: theme.colors.opaco,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        {["aluno", "professor", "admin"].map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setRole(item as any)}
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 10,
              backgroundColor:
                role === item ? theme.colors.primary : "transparent",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color:
                  role === item ? theme.colors.text : theme.colors.destaque,
                fontWeight: "600",
              }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Login */}
      <Controller
        control={control}
        name="usuarioLogin"
        render={({ field }) => (
          <InputField
            label="E-mail institucional ou login"
            value={field.value}
            onChangeText={field.onChange}
            error={errors.usuarioLogin?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="usuarioSenha"
        render={({ field }) => (
          <InputField
            label="Senha"
            value={field.value}
            onChangeText={field.onChange}
            secureTextEntry={secure}
            icon="lock"
            iconPosition="inside"
            rightIcon={secure ? "eye-off" : "eye"}
            onRightIconPress={() => setSecure(!secure)}
            error={errors.usuarioSenha?.message}
          />
        )}
      />

      <Button label="Entrar" onPress={handleSubmit(handleLogin)} />
    </Form>
  );
}