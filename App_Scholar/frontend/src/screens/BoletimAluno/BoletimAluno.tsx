import { useCallback, useMemo, useState } from "react";

import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { useBoletimAluno } from "../../hooks/Boletim/useBoletimAluno";

import { CardBoletim } from "../../components/CardBoletim";

import { CarteiraHeader } from "../../components/Form/CarteiraHeader";

import { Carteira } from "../../components/Form/Carteira";

import { FakeBottomSheet } from "../../components/Form/FakeButtonSheet";

import { FilterSheet } from "../../components/Filtro/FilterSheet";

import { useFilterSheet } from "../../hooks/Filter/useFilterSheet";

import { useGenericFilter } from "../../hooks/Filter/useGenericFilter";

import { useTheme } from "../../contexts/Theme/themeContext";
import { FiltroBoletimAluno } from "./filtro";
import { ResumoCard } from "./ResumoCard";
export function BoletimAluno() {
  const { visible, abrir, fechar } = useFilterSheet();

  const { filters, setFilters, clearFilters } = useGenericFilter<any>();

  const {
    dadosOriginais,
    buscarBoletim,
    filtrarBoletins,
    estatisticas,
    curso,
    aluno,
    semestres,
    percentualConclusao,
  } = useBoletimAluno();

  const { theme } = useTheme();
  const [busca, setBusca] = useState("");

  const [semestreSelecionado, setSemestreSelecionado] = useState<number | null>(
    aluno?.alunoSemestreAtual ?? null,
  );

  useFocusEffect(
    useCallback(() => {
      buscarBoletim();
    }, [buscarBoletim]),
  );

  const boletinsFiltrados = useMemo(() => {
    const resultado = filtrarBoletins(busca, filters);

    if (semestreSelecionado === null) return resultado;

    return resultado.filter(
      (item) => item.disciplina.disciplinaSemestre === semestreSelecionado,
    );
  }, [busca, filters, filtrarBoletins, semestreSelecionado]);

  return (
    <View style={{ flex: 1 }}>
      <Carteira title="Boletim Acadêmico">
        <View
          style={{
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: theme.colors.text,
            }}
          >
            {curso?.cursoNome}
          </Text>

          <Text style={{ color: theme.colors.text }}>
            Semestre Atual: {aluno?.alunoSemestreAtual}º
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <ResumoCard titulo="Aprovadas" valor={estatisticas.aprovadas} />

          <ResumoCard titulo="Reprovadas" valor={estatisticas.reprovadas} />

          <ResumoCard titulo="Andamento" valor={estatisticas.andamento} />

          <ResumoCard titulo="Pendentes" valor={estatisticas.naoCursadas} />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            marginBottom: 16,
          }}
        >
          <TouchableOpacity
            onPress={() => setSemestreSelecionado(null)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              marginRight: 8,
              backgroundColor:
                semestreSelecionado === null
                  ? theme.colors.primary
                  : theme.colors.text,
            }}
          >
            <Text>Todos</Text>
          </TouchableOpacity>

          {semestres.map((semestre) => (
            <TouchableOpacity
              key={semestre}
              onPress={() => setSemestreSelecionado(semestre)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                marginRight: 8,
                backgroundColor:
                  semestreSelecionado === semestre ? "#4F46E5" : "#E5E7EB",
              }}
            >
              <Text>{semestre}º</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <CarteiraHeader
          placeholder="Buscar disciplina..."
          searchValue={busca}
          onSearchChange={setBusca}
          onFilterPress={abrir}
          hideAdd={true}
        />

        {boletinsFiltrados.map((item) => (
          <CardBoletim key={item.boletimId} item={item} />
        ))}
      </Carteira>

      <FakeBottomSheet visible={visible} onClose={fechar}>
        <FilterSheet
          filters={FiltroBoletimAluno}
          filtroAtual={filters}
          onApply={(data) => {
            setFilters(data);

            fechar();
          }}
          onClear={() => {
            clearFilters();

            fechar();
          }}
        />
      </FakeBottomSheet>
    </View>
  );
}
