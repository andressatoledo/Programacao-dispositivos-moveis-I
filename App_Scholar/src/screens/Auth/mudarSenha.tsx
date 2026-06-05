import { Controller } from "react-hook-form";

import { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Form } from "@/src/components/Form/Form";

import { InputField } from "@/src/components/Form/InputField";

import { Button } from "@/src/components/Form/Button";

import { useMudarSenhaForm } from "@/src/hooks/Auth/useMudarSenhaForm";

import { useMensagem } from "@/src/hooks/Outros/useMensagem";

import { TypeMessage } from "@/src/types/Outros/messageType";

import { AuthService } from "@/src/services/authService";

import { navigateWithDelay } from "@/src/utils/navigateWithDelay";

import { RootStackParamList } from "@/src/navigation/types";

type NavProp =
  NativeStackNavigationProp<RootStackParamList>;

export function MudarSenha() {
  const navigation =
    useNavigation<NavProp>();

  const showMessage = useMensagem();

  // FALSE = senha escondida inicialmente
  const [mostrarSenhaAtual, setMostrarSenhaAtual] =
    useState(false);

  const [mostrarNovaSenha, setMostrarNovaSenha] =
    useState(false);

  const [
    mostrarConfirmarSenha,
    setMostrarConfirmarSenha,
  ] = useState(false);

  const {
    control,

    handleSubmit,

    formState: { errors },
  } = useMudarSenhaForm();

  async function onSubmit(data: any) {
    try {
      await AuthService.mudarSenha({
        senhaAtual: data.senhaAtual,

        novaSenha: data.novaSenha,
      });

      showMessage(
        "Senha alterada com sucesso",

        TypeMessage.success
      );

      await navigateWithDelay(() =>
        navigation.reset({
          index: 0,

          routes: [
            {
              name: "Home",
            },
          ],
        })
      );
    } catch (error: any) {
  const mensagem =
    error?.response?.data?.message ||
    error?.message ||
    "Erro ao alterar senha";

  showMessage(
    mensagem,
    TypeMessage.error
  );
}
  }

  return (
    <Form>
      <Controller
        control={control}
        name="senhaAtual"
        render={({ field }) => (
          <InputField
            label="Senha atual"
            value={field.value}
            onChangeText={field.onChange}
            secureTextEntry={
              !mostrarSenhaAtual
            }
            icon="lock"
            iconPosition="inside"
            rightIcon={
              mostrarSenhaAtual
                ? "eye"
                : "eye-off"
            }
            onRightIconPress={() =>
              setMostrarSenhaAtual(
                !mostrarSenhaAtual
              )
            }
            error={
              errors.senhaAtual
                ?.message
            }
          />
        )}
      />

      <Controller
        control={control}
        name="novaSenha"
        render={({ field }) => (
          <InputField
            label="Nova senha"
            value={field.value}
            onChangeText={field.onChange}
            secureTextEntry={
              !mostrarNovaSenha
            }
            icon="lock"
            iconPosition="inside"
            rightIcon={
              mostrarNovaSenha
                ? "eye"
                : "eye-off"
            }
            onRightIconPress={() =>
              setMostrarNovaSenha(
                !mostrarNovaSenha
              )
            }
            error={
              errors.novaSenha
                ?.message
            }
          />
        )}
      />

      <Controller
        control={control}
        name="confirmarSenha"
        render={({ field }) => (
          <InputField
            label="Confirmar senha"
            value={field.value}
            onChangeText={field.onChange}
            secureTextEntry={
              !mostrarConfirmarSenha
            }
            icon="lock"
            iconPosition="inside"
            rightIcon={
              mostrarConfirmarSenha
                ? "eye"
                : "eye-off"
            }
            onRightIconPress={() =>
              setMostrarConfirmarSenha(
                !mostrarConfirmarSenha
              )
            }
            error={
              errors.confirmarSenha
                ?.message
            }
          />
        )}
      />

      <Button
        label="Salvar nova senha"
        onPress={handleSubmit(onSubmit)}
        marginTop={24}
      />
    </Form>
  );
}