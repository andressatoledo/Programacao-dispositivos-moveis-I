import { TypeMessage } from "@/src/types/Outros/messageType";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { Controller } from "react-hook-form";

import { Button } from "../../components/Form/Button";
import { Form } from "../../components/Form/Form";
import { InputField } from "../../components/Form/InputField";
import {Row} from "../../components/Form/Row";
import { useBoletimAdminForm } from "../../hooks/Boletim/useBoletimAdminForm";
import { useMensagem } from "../../hooks/Outros/useMensagem";

import { RootStackParamList } from "../../navigation/types";
import { BoletimFormData } from "../../schemas/boletim.schema";
import { navigateWithDelay } from "../../utils/navigateWithDelay";
import { useTheme } from '../../contexts/Theme/themeContext';
type Props = NativeStackScreenProps<
  RootStackParamList,
  "BoletimAdminForm">;

export function BoletimAdminForm({ route, navigation }: Props) {
  const { mode, alunoId, disciplinaId } = route.params;
  const showMessage = useMensagem();
  const { theme } = useTheme();
  
  const {
    control,
    errors,
    media,
    screen,
    handleSubmit,
    saveAll,
  } = useBoletimAdminForm(mode, alunoId, disciplinaId, navigation);


  const onSubmit = async (data: BoletimFormData) => {
    try {
      await saveAll(data);

      const acao = mode === "create" ? "lançado" : "atualizado";

      showMessage(`Boletim ${acao} com sucesso.`, TypeMessage.success);

      await navigateWithDelay(() => navigation.goBack());
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        "Erro ao salvar os dados do boletim.";

      showMessage(msg, TypeMessage.error);
    }
  };

  return (
    <Form>
      <Row>
        <View style={{ flex: 1 }}>
          <Controller
            control={control}
            name="boletimNota1"
            render={({ field }) => (
              <InputField
                label="Nota 1 *"
                value={field.value?.toString()}
                onChangeText={field.onChange}
                keyboardType="numeric"
                editable={!screen.readOnly}
                error={errors.boletimNota1?.message}
              />
            )}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Controller
            control={control}
            name="boletimNota2"
            render={({ field }) => (
              <InputField
                label="Nota 2 *"
                value={field.value?.toString()}
                onChangeText={field.onChange}
                keyboardType="numeric"
                editable={!screen.readOnly}
                error={errors.boletimNota2?.message}
              />
            )}
          />
        </View>
      </Row>

    
      <View
        style={{
          marginTop: 20,
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
          backgroundColor: theme.colors.primary, // pode puxar do theme depois
        }}
      >
        <Text style={{ fontSize: 14, color: theme.colors.background }}>
          Média
        </Text>

        <Text
          style={{
            fontSize: 28,
            fontWeight: "800",
            color: theme.colors.background,
          }}
        >
          {media}
        </Text>
      </View>

      {!screen.isView && (
        <Button
          label={mode === "create" ? "Salvar notas" : "Atualizar notas"}
          onPress={handleSubmit(onSubmit)}
          disabled={screen.loading}
          marginTop={24}
        />
      )}
    </Form>
  );
}