import { useCallback, useMemo, useState } from "react";

import { View } from "react-native";

import { useFocusEffect, useNavigation } from "@react-navigation/native";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Carteira } from "../../components/Form/Carteira";

import { CarteiraItem } from "../../components/Form/CarteiraItem";

import { CarteiraHeader } from "../../components/Form/CarteiraHeader";

import { EmptyCarteira } from "../../components/Feedback/EmptyCarteira";

import { ConfirmDialog } from "../../components/Feedback/ConfirmDialog";

import { useCarteira } from "../../hooks/Aluno/useAluno";

import { useMensagem } from "../../hooks/Outros/useMensagem";

import { Aluno as TypeAluno } from "../../types/aluno";

import { RootStackParamList } from "../../navigation/types";

import { TypeMessage } from "../../types/Outros/messageType";

import { useAuth } from "../../hooks/Auth/useAuth";

import { canDeleteAluno, canViewAluno } from "../../utils/permissions";

function description(item: TypeAluno): string {
  return item.alunoEmail && item.alunoTelefone
    ? `${item.alunoEmail} • ${item.alunoTelefone}`
    : "";
}

export function Aluno() {
  type AlunoNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Aluno"
  >;

  const navigation = useNavigation<AlunoNavigationProp>();

  const showMessage = useMensagem();

  const [confirmVisible, setConfirmVisible] = useState(false);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { dados, buscarCarteira, deleteAluno } = useCarteira();

  const [busca, setBusca] = useState("");

  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  useFocusEffect(
    useCallback(() => {
      buscarCarteira();
    }, [buscarCarteira]),
  );

  const alunosFiltrados = useMemo(() => {
    const buscaLower = busca.toLowerCase().trim();

    return dados.filter((item) => {
      const nome = item.alunoNome?.toLowerCase()?.trim() || "";

      return !buscaLower || nome.includes(buscaLower);
    });
  }, [dados, busca]);

  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    try {
      await deleteAluno(selectedId);

      showMessage("Aluno excluído com sucesso.", TypeMessage.success);
    } catch (error) {
      showMessage("Erro ao excluir o aluno.", TypeMessage.error);
    } finally {
      setConfirmVisible(false);

      setSelectedId(null);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Carteira title="Aluno">
        <CarteiraHeader
          placeholder="Buscar aluno..."
          searchValue={busca}
          onSearchChange={setBusca}
          hideFilter
          onAddPress={() =>
            navigation.navigate("AlunoForm", {
              mode: "create",
            })
          }
        />

        {alunosFiltrados.length === 0 ? (
          <EmptyCarteira />
        ) : (
          alunosFiltrados.map((item) => (
            <CarteiraItem
              key={item.alunoId}
              icon="school"
              title={item.alunoNome}
              description={description(item)}
              onPress={() => {
                if (!canViewAluno(user?.role)) return;

                navigation.navigate("AlunoForm", {
                  alunoId: item.alunoId,
                  mode: isAdmin ? "edit" : "view",
                });
              }}
              onPressDelete={
                canDeleteAluno(user?.role)
                  ? () => {
                      setSelectedId(item.alunoId ?? null);

                      setConfirmVisible(true);
                    }
                  : undefined
              }
            />
          ))
        )}
      </Carteira>

      <ConfirmDialog
        visible={confirmVisible}
        title="Excluir aluno"
        description="Deseja excluir este aluno? Essa ação não poderá ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        danger
        onCancel={() => {
          setConfirmVisible(false);

          setSelectedId(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </View>
  );
}
