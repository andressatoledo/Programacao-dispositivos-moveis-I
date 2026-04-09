import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Controller } from 'react-hook-form';
import { InputField } from '../../components/Form/InputField';
import { Button } from '../../components/Form/Button';
import { Form } from '../../components/Form/Form';
import { InputCombo } from '../../components/Form/InputCombo';
import { useAlunoForm } from '../../hooks/Aluno/useAlunoForm';
import { AlunoFormData } from '../../schemas/aluno.schema';
import {formatar} from '../../utils/formatar';

type AlunoFormProps = NativeStackScreenProps<RootStackParamList, 'AlunoForm'>;

export function AlunoForm({ route, navigation }: AlunoFormProps) {
  const { mode, alunoId } = route.params;

  const {
    control,
    errors,
    screen,
    handleSubmit,
    saveAll,
    optionsCursos,
    loadingCursos,
  } = useAlunoForm(mode, alunoId, navigation);

  const onSubmit = (data: AlunoFormData) => saveAll(data);

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

      <Controller
        control={control}
        name="alunoEmail"
        render={({ field }) => (
          <InputField
            label="E-mail institucional *"
            value={field.value}
            onChangeText={(text) => field.onChange(formatar.email(text))} 
            editable={!screen.readOnly}
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
        name="alunoCEP"
        render={({ field }) => (
          <InputField
            label="CEP *"
            value={field.value}
            onChangeText={(text) => field.onChange(formatar.cep(text))} 
            keyboardType="numeric"
            error={errors.alunoCEP?.message}
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
        name="alunoCidade"
        render={({ field }) => (
          <InputField
            label="Cidade *"
            value={field.value}
            onChangeText={field.onChange}
            editable={!screen.readOnly}
            error={errors.alunoCidade?.message}
          />
        )}
      />

      {!screen.isView && (
        <Button
          label={mode === 'create' ? 'Salvar' : 'Atualizar'}
          onPress={handleSubmit(onSubmit)}
          disabled={screen.loading}
          marginTop={20}
        />
      )}
    </Form>
  );
}