import React, {
  useState,
  useCallback,
  useMemo,
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

import { useProfessor } from "../../hooks/Professor/useProfessor";

import { useMensagem } from "../../hooks/Outros/useMensagem";

import { Professor as TypeProfessor } from "../../types/professor";

import { RootStackParamList } from "../../navigation/types";

import { TypeMessage } from "@/src/types/Outros/messageType";

function description(
  item: TypeProfessor,
): string {
  return item.professorTitulacao &&
    item.professorEmail
    ? `${item.professorTitulacao} • ${item.professorEmail}`
    : "";
}

export function Professor() {
  type ProfessorNavProp =
    NativeStackNavigationProp<
      RootStackParamList,
      "Professor"
    >;

  const navigation =
    useNavigation<ProfessorNavProp>();

  const showMessage =
    useMensagem();

  const [confirmVisible, setConfirmVisible] =
    useState(false);

  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const {
    dados,
    buscarProfessor,
    deleteProfessor,
  } = useProfessor();

  const [busca, setBusca] =
    useState("");

  useFocusEffect(
    useCallback(() => {
      buscarProfessor();
    }, [buscarProfessor]),
  );

  const professoresFiltrados =
    useMemo(() => {
      const buscaLower =
        busca
          .toLowerCase()
          .trim();

      return dados.filter(
        (item) => {
          const nome =
            item.professorNome
              ?.toLowerCase()
              ?.trim() || "";

          return (
            !buscaLower ||
            nome.includes(
              buscaLower,
            )
          );
        },
      );
    }, [dados, busca]);

  const handleConfirmDelete =
    async () => {
      if (!selectedId) return;

      try {
        await deleteProfessor(
          selectedId,
        );

        showMessage(
          "Professor excluído com sucesso.",
          TypeMessage.success,
        );
      } catch (error) {
        showMessage(
          "Erro ao excluir o professor.",
          TypeMessage.error,
        );
      } finally {
        setConfirmVisible(
          false,
        );

        setSelectedId(
          null,
        );
      }
    };

  return (
    <View style={{ flex: 1 }}>
      <Carteira title="Professor">
        <CarteiraHeader
          placeholder="Buscar professor..."
          searchValue={busca}
          onSearchChange={setBusca}
          hideFilter
          onAddPress={() =>
            navigation.navigate(
              "ProfessorForm",
              {
                mode:
                  "create",
              },
            )
          }
        />

        {professoresFiltrados.length ===
        0 ? (
          <EmptyCarteira />
        ) : (
          professoresFiltrados.map(
            (item) => (
              <CarteiraItem
                key={
                  item.professorId
                }
                icon="account-tie"
                title={
                  item.professorNome
                }
                description={description(
                  item,
                )}
                onPress={() =>
                  navigation.navigate(
                    "ProfessorForm",
                    {
                      professorId:
                        item.professorId,
                      mode:
                        "edit",
                    },
                  )
                }
                onPressDelete={() => {
                  setSelectedId(
                    item.professorId ??
                      null,
                  );

                  setConfirmVisible(
                    true,
                  );
                }}
              />
            ),
          )
        )}
      </Carteira>

      <ConfirmDialog
        visible={
          confirmVisible
        }
        title="Excluir professor"
        description="Deseja excluir este professor? Essa ação não poderá ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        danger
        onCancel={() => {
          setConfirmVisible(
            false,
          );

          setSelectedId(
            null,
          );
        }}
        onConfirm={
          handleConfirmDelete
        }
      />
    </View>
  );
}