import { Controller } from "react-hook-form";

import {
  View,
  Text,
} from "react-native";

import { Form } from "../../components/Form/Form";
import { InputField } from "../../components/Form/InputField";
import { Button } from "../../components/Form/Button";
import { InputCombo } from "../../components/Form/InputCombo";
import { useMensagem } from "../../hooks/Outros/useMensagem";

import { TypeMessage } from "../../types/Outros/messageType";

import { getErrorMessage } from "../../utils/getErrorMessage";

import { useAvisoForm } from "../../hooks/Aviso/useAvisoForm";

import { useTheme } from "../../contexts/Theme/themeContext";

export function AvisoForm({
  route,
  navigation,
}: any) {
  const {
    mode,
    avisoId,
  } = route.params;

  const { theme } = useTheme();

  const showMessage =
    useMensagem();

  const {
    control,
    errors,
    handleSubmit,
    saveAll,
    screen,

    cursos,
    disciplinas,

    aviso,
  } = useAvisoForm(
    mode,
    avisoId,
  );

  const onSubmit =
    async (data: any) => {
      try {
        await saveAll(data);

        showMessage(
          mode === "create"
            ? "Aviso criado com sucesso."
            : "Aviso atualizado com sucesso.",
          TypeMessage.success,
        );

        navigation.goBack();
      } catch (error) {
        showMessage(
          getErrorMessage(
            error,
          ),
          TypeMessage.error,
        );
      }
    };

  if (screen.isView) {
    return (
      <Form>
        <View
          style={{
            backgroundColor:
              theme.colors.backgroundCard,
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor:
              theme.colors.primary,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color:
                theme.colors.text,
              marginBottom: 8,
            }}
          >
            {aviso?.avisoTitulo}
          </Text>

          <Text
            style={{
              color:
                theme.colors.opaco,
              marginBottom: 16,
            }}
          >
            {aviso?.criadoPor
              ?.usuarioNome ??
              "Administrador"}
          </Text>

          <View
            style={{
              height: 1,
              backgroundColor:
                theme.colors.primary,
              marginBottom: 16,
            }}
          />

          <Text
            style={{
              color:
                theme.colors.text,
              fontSize: 16,
              lineHeight: 24,
            }}
          >
            {aviso?.avisoMensagem}
          </Text>

          {(aviso?.curso ||
            aviso?.disciplina) && (
            <View
              style={{
                marginTop: 24,
                paddingTop: 16,
                borderTopWidth: 1,
                borderTopColor:
                  theme.colors.primary,
              }}
            >
              {aviso?.curso && (
                <Text
                  style={{
                    color:
                      theme.colors.detail,
                    marginBottom: 6,
                  }}
                >
                  📚 Curso:
                  {" "}
                  {
                    aviso.curso
                      .cursoNome
                  }
                </Text>
              )}

              {aviso?.disciplina && (
                <Text
                  style={{
                    color:
                      theme.colors.detail,
                  }}
                >
                  📖 Disciplina:
                  {" "}
                  {
                    aviso
                      .disciplina
                      .disciplinaNome
                  }
                </Text>
              )}
            </View>
          )}
        </View>
      </Form>
    );
  }

  return (
    <Form>
      <Controller
        control={control}
        name="avisoTitulo"
        render={({ field }) => (
          <InputField
            label="Título *"
            value={field.value}
            onChangeText={
              field.onChange
            }
            editable={
              !screen.readOnly
            }
            error={
              errors
                .avisoTitulo
                ?.message
            }
          />
        )}
      />

      <Controller
        control={control}
        name="avisoMensagem"
        render={({ field }) => (
          <InputField
            label="Mensagem *"
            value={field.value}
            onChangeText={
              field.onChange
            }
            editable={
              !screen.readOnly
            }
            multiline
            numberOfLines={6}
            error={
              errors
                .avisoMensagem
                ?.message
            }
          />
        )}
      />

      <Controller
        control={control}
        name="cursoId"
        render={({ field }) => (
          <InputCombo
            label="Curso"
            value={field.value}
            options={cursos}
            onChange={
              field.onChange
            }
            emptyLabel="Selecione"
            error={
              errors.cursoId
                ?.message
            }
          />
        )}
      />

      <Controller
        control={control}
        name="disciplinaId"
        render={({ field }) => (
          <InputCombo
            label="Disciplina"
            value={field.value}
            options={
              disciplinas
            }
            onChange={
              field.onChange
            }
            emptyLabel="Selecione"
            error={
              errors
                .disciplinaId
                ?.message
            }
          />
        )}
      />

      <Button
        label={
          mode === "create"
            ? "Salvar"
            : "Atualizar"
        }
        onPress={handleSubmit(
          onSubmit,
        )}
        disabled={
          screen.loading
        }
        marginTop={20}
      />
    </Form>
  );
}