import { TypeMessage } from "../../types/Outros/messageType";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Controller } from "react-hook-form";
import { Button } from "../../components/Form/Button";
import { Form } from "../../components/Form/Form";
import { InputField } from "../../components/Form/InputField";
import { useCursoForm } from "../../hooks/Curso/useCursoForm";
import { useMensagem } from "../../hooks/Outros/useMensagem";
import { RootStackParamList } from "../../navigation/types";
import { CursoFormData } from "../../schemas/curso.schema";
import { navigateWithDelay } from "../../utils/navigateWithDelay";

type CursoFormProps = NativeStackScreenProps<RootStackParamList, "CursoForm">;

export function CursoForm({ route, navigation }: CursoFormProps) {
  const { mode, cursoId } = route.params;
  const showMessage = useMensagem();

  const { control, errors, screen, handleSubmit, saveAll } = useCursoForm(
    mode,
    cursoId,
    navigation,
  );

  const onSubmit = async (data: CursoFormData) => {
    try {
      await saveAll(data);
      const acao = mode === "create" ? "cadastrado" : "atualizado";
      showMessage(`Curso ${acao} com sucesso.`, TypeMessage.success);
      await navigateWithDelay(() => navigation.goBack());
    } catch (error: any) {
      const msg =
        error?.response?.data?.message || "Erro ao salvar os dados do curso.";
      showMessage(msg, TypeMessage.error);
    }
  };

  return (
    <Form>
      <Controller
        control={control}
        name="cursoNome"
        render={({ field }) => (
          <InputField
            label="Nome do curso *"
            value={field.value}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            error={errors.cursoNome?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="cursoPeriodo"
        render={({ field }) => (
          <InputField
            label="Período *"
            value={field.value}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            error={errors.cursoPeriodo?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="cursoMediaAprovacao"
        render={({ field }) => (
          <InputField
            label="Média de aprovação *"
            value={field.value?.toString()}
            onChangeText={field.onChange}
            keyboardType="numeric"
            editable={!screen.readOnly}
            error={errors.cursoMediaAprovacao?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="cursoDuracao"
        render={({ field }) => (
          <InputField
            label="Duração (semestres) *"
            value={field.value?.toString()}
            onChangeText={field.onChange}
            keyboardType="numeric"
            editable={!screen.readOnly}
            error={errors.cursoDuracao?.message}
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
