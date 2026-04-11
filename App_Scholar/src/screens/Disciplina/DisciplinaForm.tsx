import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { Controller } from "react-hook-form";
import { InputField } from "../../components/Form/InputField";
import { Button } from "../../components/Form/Button";
import { Form } from "../../components/Form/Form";
import { InputCombo } from "../../components/Form/InputCombo";
import { useDisciplinaForm } from "../../hooks/Disciplina/useDisciplinaForm";
import { DisciplinaFormData } from "../../schemas/disciplina.schema";
import { useMensagem } from "../../hooks/Outros/useMensagem";
import { TypeMessage } from "@/src/types/Outros/messageType";
import { navigateWithDelay } from "../../utils/navigateWithDelay";

type DisciplinaFormProps = NativeStackScreenProps<RootStackParamList, "DisciplinaForm">;

export function DisciplinaForm({ route, navigation }: DisciplinaFormProps) {
  const { mode, disciplinaId } = route.params;
  const showMessage = useMensagem();

  const {
    control,
    errors,
    screen,
    handleSubmit,
    saveAll,
    optionsCursos,
    optionsProfessores,
    loadingCursos,
    loadingProfessores,
  } = useDisciplinaForm(mode, disciplinaId, navigation);

  const onSubmit = async (data: DisciplinaFormData) => {
    try {
      await saveAll(data);
      const acao = mode === "create" ? "cadastrada" : "atualizada";
      showMessage(`Disciplina ${acao} com sucesso.`, TypeMessage.success);
      await navigateWithDelay(() => navigation.goBack());
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Erro ao salvar os dados da disciplina.";
      showMessage(msg, TypeMessage.error);
    }
  };

  return (
    <Form>
      <Controller
        control={control}
        name="disciplinaNome"
        render={({ field }) => (
          <InputField
            label="Nome da disciplina *"
            value={field.value}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            error={errors.disciplinaNome?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="disciplinaCargaHoraria"
        render={({ field }) => (
          <InputField
            label="Carga horária *"
            value={field.value?.toString()}
            onChangeText={field.onChange}
            keyboardType="numeric"
            editable={!screen.readOnly}
            error={errors.disciplinaCargaHoraria?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="disciplinaSemestre"
        render={({ field }) => (
          <InputField
            label="Semestre *"
            value={field.value?.toString()}
            onChangeText={field.onChange}
            keyboardType="numeric"
            editable={!screen.readOnly}
            error={errors.disciplinaSemestre?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="professorID"
        render={({ field }) => (
          <InputCombo
            label="Professor *"
            value={field.value}
            options={optionsProfessores}
            loading={loadingProfessores}
            onChange={field.onChange}
            disabled={screen.readOnly}
            error={errors.professorID?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="cursoID"
        render={({ field }) => (
          <InputCombo
            label="Curso *"
            value={field.value}
            options={optionsCursos}
            loading={loadingCursos}
            onChange={field.onChange}
            disabled={screen.readOnly}
            error={errors.cursoID?.message}
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