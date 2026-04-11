import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { Controller } from "react-hook-form";
import { InputField } from "../../components/Form/InputField";
import { Button } from "../../components/Form/Button";
import { Form } from "../../components/Form/Form";
import { useProfessorForm } from "../../hooks/Professor/useProfessorForm";
import { ProfessorFormData } from "../../schemas/professor.schema";
import { useMensagem } from "../../hooks/Outros/useMensagem";
import { TypeMessage } from "@/src/types/Outros/messageType";
import { navigateWithDelay } from "../../utils/navigateWithDelay";

type ProfessorFormProps = NativeStackScreenProps<RootStackParamList, "ProfessorForm">;

export function ProfessorForm({ route, navigation }: ProfessorFormProps) {
  const { mode, professorId } = route.params;
  const showMessage = useMensagem();

  const {
    control,
    errors,
    screen,
    handleSubmit,
    saveAll,
  } = useProfessorForm(mode, professorId, navigation);

  const onSubmit = async (data: ProfessorFormData) => {
    try {
      await saveAll(data);
      const acao = mode === "create" ? "cadastrado" : "atualizado";
      showMessage(`Professor ${acao} com sucesso.`, TypeMessage.success);
      await navigateWithDelay(() => navigation.goBack());
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Erro ao salvar os dados do professor.";
      showMessage(msg, TypeMessage.error);
    }
  };

  return (
    <Form>
      <Controller
        control={control}
        name="professorNome"
        render={({ field }) => (
          <InputField
            label="Nome completo *"
            value={field.value}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            error={errors.professorNome?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="professorTitulacao"
        render={({ field }) => (
          <InputField
            label="Titulação *"
            value={field.value}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            error={errors.professorTitulacao?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="professorAreaAtuacao"
        render={({ field }) => (
          <InputField
            label="Área de atuação *"
            value={field.value}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            error={errors.professorAreaAtuacao?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="professorTempoDocencia"
        render={({ field }) => (
          <InputField
            label="Tempo de docência *"
            value={field.value?.toString()}
            onChangeText={field.onChange}
            keyboardType="numeric"
            editable={!screen.readOnly}
            error={errors.professorTempoDocencia?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="professorEmail"
        render={({ field }) => (
          <InputField
            label="E-mail *"
            value={field.value}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            keyboardType="email-address"
            error={errors.professorEmail?.message}
          />
        )}
      />

      {!screen.isView && (
        <Button
          label={mode === "create" ? "Salvar" : "Atualizar"}
          onPress={handleSubmit(onSubmit)}
          disabled={screen.loading}
          marginTop={20}
        />
      )}
    </Form>
  );
}