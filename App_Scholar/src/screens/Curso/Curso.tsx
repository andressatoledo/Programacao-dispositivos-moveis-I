import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Carteira } from '../../components/Form/Carteira';
import { CarteiraItem } from '../../components/Form/CarteiraItem';
import { CarteiraHeader } from '../../components/Form/CarteiraHeader';
import { FilterSheet } from '../../components/Filtro/FilterSheet';
import { FakeBottomSheet } from '../../components/Form/FakeButtonSheet';
import { EmptyCarteira } from '../../components/Feedback/EmptyCarteira';
import { ConfirmDialog } from '../../components/Feedback/ConfirmDialog';

import { useCurso } from '../../hooks/Curso/useCurso';
import { useFilterSheet } from '../../hooks/Filter/useFilterSheet';
import { useGenericFilter } from '../../hooks/Filter/useGenericFilter';
import { useMensagem } from '../../hooks/Outros/useMensagem';

import { Curso as TypeCurso, CursoFiltro } from '../../types/curso';
import { RootStackParamList } from '../../navigation/types';
import { TypeMessage } from '@/src/types/Outros/messageType';
import { FiltroCurso } from './filtro';

function description(item: TypeCurso): string {
  return `${item.cursoPeriodo} • ${item.cursoDuracao} semestres`;
}

export function Curso() {
  type CursoNavProp = NativeStackNavigationProp<RootStackParamList, 'Curso'>;
  const navigation = useNavigation<CursoNavProp>();
  const showMessage = useMensagem();

  const { visible, abrir, fechar } = useFilterSheet();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const { filters, setFilters, clearFilters } = useGenericFilter<CursoFiltro>();
  const { dados, buscarCurso, deleteCurso } = useCurso();
  const [busca, setBusca] = useState('');

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    try {
      await deleteCurso(selectedId);
      showMessage('Curso excluído com sucesso.', TypeMessage.success);
    } catch (error) {
      showMessage('Erro ao excluir o curso.', TypeMessage.error);
    } finally {
      setConfirmVisible(false);
      setSelectedId(null);
    }
  };

  useFocusEffect(
    useCallback(() => {
      buscarCurso({ ...filters, cursoNome: busca });
    }, [buscarCurso, filters, busca])
  );

  return (
    <View style={{ flex: 1 }}>
      <Carteira title="Curso">
        <CarteiraHeader
          placeholder="Buscar curso..."
          searchValue={busca}
          onSearchChange={setBusca}
          onFilterPress={abrir}
          onAddPress={() => navigation.navigate('CursoForm', { mode: 'create' })}
        />
        
        {dados.length === 0 ? (
          <EmptyCarteira />
        ) : (
          dados.map(item => (
            <CarteiraItem
              key={item.cursoId}
              icon="book-open-variant"
              title={item.cursoNome}
              description={description(item)}
              onPress={() => navigation.navigate('CursoForm', { cursoId: item.cursoId, mode: 'edit' })}
              onPressDelete={() => {
                setSelectedId(item.cursoId ?? null);
                setConfirmVisible(true);
              }}
            />
          ))
        )}
      </Carteira>

      <ConfirmDialog
        visible={confirmVisible}
        title="Excluir curso"
        description="Deseja excluir este curso? Essa ação não poderá ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        danger
        onCancel={() => {
          setConfirmVisible(false);
          setSelectedId(null);
        }}
        onConfirm={handleConfirmDelete} 
      />

      <FakeBottomSheet visible={visible} onClose={fechar}>
        <FilterSheet
          filters={FiltroCurso}
          filtroAtual={filters}
          onApply={data => {
            setFilters(data);
            buscarCurso({ ...data, cursoNome: busca });
            fechar();
          }}
          onClear={() => {
            clearFilters();
            buscarCurso({ cursoNome: busca });
            fechar();
          }}
        />
      </FakeBottomSheet>
    </View>
  );
}