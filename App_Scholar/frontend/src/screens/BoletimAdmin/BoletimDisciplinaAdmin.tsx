import { useCallback } from "react";

import { View } from "react-native";

import {
    useFocusEffect,
    useNavigation,
    useRoute,
} from "@react-navigation/native";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Carteira } from "../../components/Form/Carteira";

import { CarteiraItem } from "../../components/Form/CarteiraItem";

import { CarteiraHeader } from "../../components/Form/CarteiraHeader";

import { EmptyCarteira } from "../../components/Feedback/EmptyCarteira";

import { RootStackParamList } from "../../navigation/types";

import { useBoletimDisciplinaAdmin } from "../../hooks/Boletim/useBoletimDisciplinaAdmin";

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  "BoletimDisciplinaAdmin"
>;

export function BoletimDisciplinaAdmin() {
  const navigation = useNavigation<NavProp>();

  const route = useRoute<any>();

  const { alunoId } = route.params;

  const { disciplinasDoAluno, buscarDisciplinasDoAluno, busca, setBusca } =
    useBoletimDisciplinaAdmin();

  useFocusEffect(
    useCallback(() => {
      buscarDisciplinasDoAluno(alunoId);
    }, [alunoId, buscarDisciplinasDoAluno]),
  );

  return (
    <View style={{ flex: 1 }}>
      <Carteira title="Disciplinas">
        <CarteiraHeader
          placeholder="Buscar disciplina..."
          searchValue={busca}
          onSearchChange={setBusca}
          hideAdd={true}
        />

        {disciplinasDoAluno.length === 0 ? (
          <EmptyCarteira />
        ) : (
          disciplinasDoAluno.map((item) => (
            <CarteiraItem
              key={item.boletimId}
              icon="book-education"
              title={item.disciplina?.disciplinaNome || "Disciplina sem nome"}
              description={`Média: ${item.boletimMedia?.toFixed(1) ?? "0.0"}`}
              onPress={() => {
                navigation.navigate("BoletimAdminForm", {
                  mode: "edit",

                  alunoId,

                  disciplinaId: item.disciplinaId,

                  boletimId: item.boletimId,

                  disciplinaNome: item.disciplina.disciplinaNome,
                });
              }}
            />
          ))
        )}
      </Carteira>
    </View>
  );
}
