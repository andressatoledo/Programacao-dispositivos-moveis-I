import { useState } from "react";
import { Controller } from "react-hook-form";
import { Image, Text, View } from "react-native";

import { useAuth } from "../../hooks/Auth/useAuth";
import { useLoginScreen } from "../../hooks/Auth/useLoginScreen";
import { AuthService } from "../../services/authService";

import { Button } from "../../components/Form/Button";
import { Form } from "../../components/Form/Form";
import { InputField } from "../../components/Form/InputField";

import { useTheme } from "../../contexts/Theme/themeContext";
import { TypeMessage } from "../../types/Outros/messageType";
import { useMensagem } from "../../hooks/Outros/useMensagem";

export default function LoginScreen() {
  const { login } = useAuth();
  const { theme } = useTheme();
  const showMessage = useMensagem();

  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const { control, errors, handleSubmit } = useLoginScreen();

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      const response = await AuthService.login({
        email: data.usuarioLogin,
        senha: data.usuarioSenha,
      });

      login({
        token: response.token,
        user: {
          id: response.usuario.id,
          nome: response.usuario.nome,
          email: response.usuario.email,
          role: response.usuario.role,
          // alunoId: response.usuario.alunoId,
          // professorId: response.usuario.professorId,
        },
      });

      showMessage("Login realizado com sucesso", TypeMessage.success);
    } catch (error: any) {
      showMessage(
        error?.response?.data?.error || "Erro ao realizar login",
        TypeMessage.error,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form>
      {/* HEADER */}
      <View style={{ alignItems: "center", marginBottom: 30 }}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 80, height: 80, marginBottom: 15 }}
          resizeMode="contain"
        />

        <Text
          style={{ fontSize: 24, fontWeight: "bold", color: theme.colors.text }}
        >
          App Scholar
        </Text>

        <Text style={{ color: theme.colors.destaque, textAlign: "center" }}>
          Gerenciamento de Boletim Acadêmico
        </Text>
      </View>

      {/* LOGIN */}
      <Controller
        control={control}
        name="usuarioLogin"
        render={({ field }) => (
          <InputField
            label="E-mail ou login"
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

      <Button
        label={loading ? "Entrando..." : "Entrar"}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      />
    </Form>
  );
}
