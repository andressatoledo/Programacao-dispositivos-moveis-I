import { TypeMessage } from "@/src/types/Outros/messageType";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Controller } from "react-hook-form";
import { Button } from "../../components/Form/Button";
import { Form } from "../../components/Form/Form";
import { InputCombo } from "../../components/Form/InputCombo";
import { InputField } from "../../components/Form/InputField";
import { useBoletimAlunoForm} from "../../hooks/Boletim/useBoletimAlunoForm";
import { useMensagem } from "../../hooks/Outros/useMensagem";
import { RootStackParamList } from "../../navigation/types";
import { BoletimFormData } from "../../schemas/boletim.schema";
import { navigateWithDelay } from "../../utils/navigateWithDelay";

type BoletimFormProps = NativeStackScreenProps<
  RootStackParamList,
  "BoletimAlunoForm"
>;

export function BoletimAlunoForm({ route, navigation }: BoletimFormProps) {
  const { mode, alunoId } = route.params;
  const showMessage = useMensagem();

  const {
    control,
    errors,
    screen,
    handleSubmit,
    saveAll,
    optionsAlunos,
    optionsDisciplinas,
    loadingAlunos,
    loadingDisciplinas,
  } = useBoletimAlunoForm(mode, alunoId, navigation);

  const onSubmit = async (data: BoletimFormData) => {
    try {
      await saveAll(data);
      const acao = mode === "create" ? "cadastrado" : "atualizado";
      showMessage(`Boletim ${acao} com sucesso.`, TypeMessage.success);
      await navigateWithDelay(() => navigation.goBack());
    } catch (error: any) {
      const msg =
        error?.response?.data?.message || "Erro ao salvar os dados do boletim.";
      showMessage(msg, TypeMessage.error);
    }
  };

  return (
    <Form>
      <Controller
        control={control}
        name="alunoID"
        render={({ field }) => (
          <InputCombo
            label="Aluno *"
            value={field.value}
            options={optionsAlunos}
            loading={loadingAlunos}
            onChange={field.onChange}
            disabled={screen.readOnly}
            error={errors.alunoID?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="disciplinaID"
        render={({ field }) => (
          <InputCombo
            label="Disciplina *"
            value={field.value}
            options={optionsDisciplinas}
            loading={loadingDisciplinas}
            onChange={field.onChange}
            disabled={screen.readOnly}
            error={errors.disciplinaID?.message}
          />
        )}
      />

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
