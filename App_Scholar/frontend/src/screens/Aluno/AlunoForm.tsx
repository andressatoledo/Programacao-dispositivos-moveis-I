import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Controller } from "react-hook-form";
import { RootStackParamList } from "../../navigation/types";

import { Button } from "../../components/Form/Button";
import { Form } from "../../components/Form/Form";
import { InputCombo } from "../../components/Form/InputCombo";
import { InputField } from "../../components/Form/InputField";

import { useAlunoForm } from "../../hooks/Aluno/useAlunoForm";
import { AlunoFormData } from "../../schemas/aluno.schema";

import { TypeMessage } from "../../types/Outros/messageType";
import { useMensagem } from "../../hooks/Outros/useMensagem";
import { formatar } from "../../utils/formatar";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { navigateWithDelay } from "../../utils/navigateWithDelay";

type Props = NativeStackScreenProps<RootStackParamList, "AlunoForm">;

export function AlunoForm({ route, navigation }: Props) {
  const { mode, alunoId } = route.params;

  const {
    control,
    errors,
    screen,
    handleSubmit,
    saveAll,

    optionsCursos,
    loadingCursos,

    optionsEstados,
    optionsCidades,
    loadingEstados,
    loadingCidades,
    estado,
    handleEstadoChange,
  } = useAlunoForm(mode, alunoId);

  const showMessage = useMensagem();

  const onSubmit = async (data: AlunoFormData) => {
    try {
      await saveAll(data);

      showMessage(
        `Aluno ${mode === "create" ? "cadastrado" : "atualizado"} com sucesso.`,
        TypeMessage.success,
      );

      await navigateWithDelay(() => navigation.goBack());
    } catch (error) {
      showMessage(getErrorMessage(error), TypeMessage.error);
    }
  };

  return (
    <Form>
      <Controller
        control={control}
        name="alunoNome"
        render={({ field }) => (
          <InputField
            label="Nome completo *"
            value={field.value}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            error={errors.alunoNome?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="alunoMatricula"
        render={({ field }) => (
          <InputField
            label="Matrícula *"
            value={field.value}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            error={errors.alunoMatricula?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="cursoId"
        render={({ field }) => (
          <InputCombo
            label="Curso *"
            value={field.value}
            options={optionsCursos}
            loading={loadingCursos}
            onChange={field.onChange}
            disabled={screen.readOnly}
            error={errors.cursoId?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="alunoEmail"
        render={({ field }) => (
          <InputField
            label="E-mail *"
            value={field.value}
            onChangeText={(text) => field.onChange(formatar.email(text) || "")}
            editable={screen.isCreate}
            keyboardType="email-address"
            error={errors.alunoEmail?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="alunoTelefone"
        render={({ field }) => (
          <InputField
            label="Telefone *"
            value={field.value}
            onChangeText={(text) => field.onChange(formatar.telefone(text))}
            editable={!screen.readOnly}
            keyboardType="phone-pad"
            error={errors.alunoTelefone?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="alunoCep"
        render={({ field }) => (
          <InputField
            label="CEP *"
            value={field.value}
            onChangeText={(text) => field.onChange(formatar.cep(text))}
            keyboardType="numeric"
            error={errors.alunoCep?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="alunoEndereco"
        render={({ field }) => (
          <InputField
            label="Endereço *"
            value={field.value}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            error={errors.alunoEndereco?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="alunoEstado"
        render={({ field }) => (
          <InputCombo
            label="Estado *"
            value={field.value}
            options={optionsEstados}
            loading={loadingEstados}
            onChange={handleEstadoChange}
            disabled={screen.readOnly}
            error={errors.alunoEstado?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="alunoCidade"
        render={({ field }) => (
          <InputCombo
            label="Cidade *"
            value={field.value}
            options={optionsCidades}
            loading={loadingCidades}
            onChange={field.onChange}
            disabled={screen.readOnly || !estado}
            error={errors.alunoCidade?.message}
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
