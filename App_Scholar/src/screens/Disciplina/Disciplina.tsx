import React, {
  useState,
  useCallback,
} from "react";

import { View } from "react-native";

import {
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Carteira } from "../../components/Form/Carteira";

import { CarteiraItem } from "../../components/Form/CarteiraItem";

import { CarteiraHeader } from "../../components/Form/CarteiraHeader";

import { EmptyCarteira } from "../../components/Feedback/EmptyCarteira";

import { ConfirmDialog } from "../../components/Feedback/ConfirmDialog";

import { useDisciplina } from "../../hooks/Disciplina/useDisciplina";

import { useMensagem } from "../../hooks/Outros/useMensagem";

import { Disciplina as TypeDisciplina } from "../../types/disciplina";

import { RootStackParamList } from "../../navigation/types";

import { TypeMessage } from "@/src/types/Outros/messageType";

/**
 * DESCRIÇÃO DO CARD
 */
function description(
  item: TypeDisciplina,
): string {
  return `Semestre: ${item.disciplinaSemestre} • Carga: ${item.disciplinaCargaHoraria}h`;
}

export function Disciplina() {
  type DisciplinaNavProp =
    NativeStackNavigationProp<
      RootStackParamList,
      "Disciplina"
    >;

  const navigation =
    useNavigation<DisciplinaNavProp>();

  const showMessage =
    useMensagem();

  /**
   * MODAL EXCLUSÃO
   */
  const [
    confirmVisible,
    setConfirmVisible,
  ] = useState(false);

  const [
    selectedId,
    setSelectedId,
  ] = useState<string | null>(
    null,
  );

  /**
   * HOOK
   */
  const {
    dados,
    busca,
    setBusca,
    buscarDisciplina,
    deleteDisciplina,
  } = useDisciplina();

  /**
   * CARREGA DISCIPLINAS
   */
  useFocusEffect(
    useCallback(() => {
      buscarDisciplina();
    }, [buscarDisciplina]),
  );

  /**
   * CONFIRMAR EXCLUSÃO
   */
  const handleConfirmDelete =
    async () => {
      if (!selectedId) return;

      try {
        await deleteDisciplina(
          selectedId,
        );

        showMessage(
          "Disciplina excluída com sucesso.",
          TypeMessage.success,
        );
      } catch (error) {
        showMessage(
          "Erro ao excluir a disciplina.",
          TypeMessage.error,
        );
      } finally {
        setConfirmVisible(false);

        setSelectedId(null);
      }
    };

  return (
    <View style={{ flex: 1 }}>
      <Carteira title="Disciplina">
        <CarteiraHeader
          placeholder="Buscar disciplina..."
          searchValue={busca}
          onSearchChange={setBusca}
          onAddPress={() =>
            navigation.navigate(
              "DisciplinaForm",
              {
                mode: "create",
              },
            )
          }
        />

        {dados.length === 0 ? (
          <EmptyCarteira />
        ) : (
          dados.map((item) => (
            <CarteiraItem
              key={
                item.disciplinaId
              }
              icon="notebook"
              title={
                item.disciplinaNome
              }
              description={description(
                item,
              )}
              onPress={() =>
                navigation.navigate(
                  "DisciplinaForm",
                  {
                    disciplinaId:
                      item.disciplinaId,

                    mode: "edit",
                  },
                )
              }
              onPressDelete={() => {
                setSelectedId(
                  item.disciplinaId ??
                    null,
                );

                setConfirmVisible(
                  true,
                );
              }}
            />
          ))
        )}
      </Carteira>

      <ConfirmDialog
        visible={confirmVisible}
        title="Excluir disciplina"
        description="Deseja excluir esta disciplina? Essa ação não poderá ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        danger
        onCancel={() => {
          setConfirmVisible(
            false,
          );

          setSelectedId(null);
        }}
        onConfirm={
          handleConfirmDelete
        }
      />
    </View>
  );
}