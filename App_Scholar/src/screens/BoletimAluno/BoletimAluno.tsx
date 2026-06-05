import React, {
  useState,
  useCallback,
  useMemo,
} from "react";

import { View } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { useBoletimAluno } from "../../hooks/Boletim/useBoletimAluno";

import { CardBoletim } from "../../components/CardBoletim";

import { CarteiraHeader } from "../../components/Form/CarteiraHeader";

import { Carteira } from "../../components/Form/Carteira";

import { FakeBottomSheet } from "../../components/Form/FakeButtonSheet";

import { FilterSheet } from "../../components/Filtro/FilterSheet";

import { useFilterSheet } from "../../hooks/Filter/useFilterSheet";

import { useGenericFilter } from "../../hooks/Filter/useGenericFilter";

import { FiltroBoletimAluno } from "./filtro";

export function BoletimAluno() {
  const {
    visible,
    abrir,
    fechar,
  } = useFilterSheet();

  const {
    filters,
    setFilters,
    clearFilters,
  } = useGenericFilter<any>();

  const {
    dadosOriginais,
    buscarBoletim,
    filtrarBoletins,
  } = useBoletimAluno();

  const [busca, setBusca] =
    useState("");

  useFocusEffect(
    useCallback(() => {
      buscarBoletim();
    }, [buscarBoletim]),
  );

  const boletinsFiltrados =
    useMemo(() => {
      return filtrarBoletins(
        busca,
        filters,
      );
    }, [
      busca,
      filters,
      filtrarBoletins,
    ]);

  return (
    <View style={{ flex: 1 }}>
      <Carteira title="Disciplina">
        <CarteiraHeader
          placeholder="Buscar disciplina..."
          searchValue={busca}
          onSearchChange={setBusca}
          onFilterPress={abrir}
          hideAdd={true}
        />

        {boletinsFiltrados.map(
          (item) => (
            <CardBoletim
              key={item.boletimId}
              item={item}
            />
          ),
        )}
      </Carteira>

      <FakeBottomSheet
        visible={visible}
        onClose={fechar}
      >
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