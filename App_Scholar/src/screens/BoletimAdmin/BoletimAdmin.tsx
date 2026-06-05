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

import { useBoletimAdmin } from "../../hooks/Boletim/useBoletimAdmin";

import { useMensagem } from "../../hooks/Outros/useMensagem";

import { RootStackParamList } from "../../navigation/types";

import { TypeMessage } from "@/src/types/Outros/messageType";

export function BoletimAdmin() {
  type NavProp =
    NativeStackNavigationProp<
      RootStackParamList,
      "BoletimAdmin"
    >;

  const navigation =
    useNavigation<NavProp>();

  const showMessage =
    useMensagem();

  const [confirmVisible, setConfirmVisible] =
    useState(false);

  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const {
    dados,
    buscarListaAlunos,
    deleteBoletim,
  } = useBoletimAdmin();

  const [busca, setBusca] =
    useState("");

  useFocusEffect(
    useCallback(() => {
      buscarListaAlunos();
    }, [buscarListaAlunos])
  );

  const alunosFiltrados = useMemo(() => {
    const buscaLower =
      busca.toLowerCase().trim();

    const boletinsFiltrados =
      dados.filter((item) => {
        const nome =
          item.aluno?.alunoNome
            ?.toLowerCase()
            ?.trim() || "";

        return (
          !buscaLower ||
          nome.includes(buscaLower)
        );
      });

    return boletinsFiltrados.filter(
      (item, index, array) =>
        array.findIndex(
          (b) =>
            b.alunoId ===
            item.alunoId
        ) === index
    );
  }, [dados, busca]);

  const handleConfirmDelete =
    async () => {
      if (!selectedId) return;

      try {
        await deleteBoletim(
          selectedId
        );

        showMessage(
          "Registros do aluno excluídos com sucesso.",
          TypeMessage.success
        );
      } catch (error) {
        showMessage(
          "Erro ao excluir registros do aluno.",
          TypeMessage.error
        );
      } finally {
        setConfirmVisible(false);

        setSelectedId(null);
      }
    };

  return (
    <View style={{ flex: 1 }}>
      <Carteira title="Boletins">
        <CarteiraHeader
          placeholder="Buscar aluno..."
          searchValue={busca}
          onSearchChange={setBusca}
          hideFilter
        />

        {alunosFiltrados.length ===
        0 ? (
          <EmptyCarteira />
        ) : (
          alunosFiltrados.map(
            (item) => (
              <CarteiraItem
                key={
                  item.alunoId
                }
                icon="account-school"
                title={
                  item.aluno
                    ?.alunoNome ||
                  "Aluno sem nome"
                }
                description="Clique para gerenciar notas e disciplinas"
                onPress={() => {
                  navigation.navigate(
                    "BoletimDisciplinaAdmin",
                    {
                      alunoId:
                        item.alunoId,
                      mode: "edit",
                    }
                  );
                }}
              />
            )
          )
        )}
      </Carteira>

      <ConfirmDialog
        visible={confirmVisible}
        title="Excluir registros"
        description={`Deseja excluir todos os boletins de ${
          alunosFiltrados.find(
            (a) =>
              a.alunoId ===
              selectedId
          )?.aluno.alunoNome
        }?`}
        confirmText="Excluir tudo"
        cancelText="Cancelar"
        danger
        onCancel={() => {
          setConfirmVisible(false);

          setSelectedId(null);
        }}
        onConfirm={
          handleConfirmDelete
        }
      />
    </View>
  );
}