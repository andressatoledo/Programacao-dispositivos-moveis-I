import React, { useState, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useBoletimAluno } from '../../hooks/Boletim/useBoletimAluno';
import { CardBoletim } from '../../components/CardBoletim';
import { CarteiraHeader } from '../../components/Form/CarteiraHeader';
import { Carteira } from '../../components/Form/Carteira';
import { FakeBottomSheet } from '../../components/Form/FakeButtonSheet';
import { FilterSheet } from '../../components/Filtro/FilterSheet';
import { useFilterSheet } from '../../hooks/Filter/useFilterSheet';
import { useGenericFilter } from '../../hooks/Filter/useGenericFilter';
import { FiltroBoletimAluno } from './filtro';


export function BoletimAluno() {
  const alunoIdMock = "1";
  const { visible, abrir, fechar } = useFilterSheet();
  const { filters, setFilters, clearFilters } = useGenericFilter<any>();
  const { dados, buscarBoletim } = useBoletimAluno(alunoIdMock);
  const [busca, setBusca] = useState('');
  
  useFocusEffect(
    useCallback(() => {
      buscarBoletim(filters);
    }, [buscarBoletim, filters])
  );

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
      
      
        {dados.map(item => (
          <CardBoletim key={item.boletimId} item={item} />
        ))}
     
      </Carteira>
       <FakeBottomSheet visible={visible} onClose={fechar}>
            <FilterSheet
              filters={FiltroBoletimAluno}
              filtroAtual={filters}
              onApply={data => {
                setFilters(data);
                buscarBoletim({ ...data, disciplinaNome: busca });
                fechar();
              }}
              onClear={() => {
                clearFilters();
                buscarBoletim({ disciplinaNome: busca });
                fechar();
              }}
            />
          </FakeBottomSheet>

      
    </View>
  );
}