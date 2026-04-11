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

import { useProfessor } from '../../hooks/Professor/useProfessor';
import { useFilterSheet } from '../../hooks/Filter/useFilterSheet';
import { useGenericFilter } from '../../hooks/Filter/useGenericFilter';
import { useMensagem } from '../../hooks/Outros/useMensagem';

import { Professor as TypeProfessor, ProfessorFiltro } from '../../types/professor';
import { RootStackParamList } from '../../navigation/types';
import { TypeMessage } from '@/src/types/Outros/messageType';
import { FiltroProfessor } from './filtro';

function description(item: TypeProfessor): string {
  return item.professorTitulacao && item.professorEmail 
    ? `${item.professorTitulacao} • ${item.professorEmail}` 
    : '';
}

export function Professor() {
  type ProfessorNavProp = NativeStackNavigationProp<RootStackParamList, 'Professor'>;
  const navigation = useNavigation<ProfessorNavProp>();
  const showMessage = useMensagem();

  const { visible, abrir, fechar } = useFilterSheet();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const { filters, setFilters, clearFilters } = useGenericFilter<ProfessorFiltro>();
  const { dados, buscarProfessor, deleteProfessor } = useProfessor();
  const [busca, setBusca] = useState('');

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    try {
      await deleteProfessor(selectedId);
      showMessage('Professor excluído com sucesso.', TypeMessage.success);
    } catch (error) {
      showMessage('Erro ao excluir o professor.', TypeMessage.error);
    } finally {
      setConfirmVisible(false);
      setSelectedId(null);
    }
  };

  useFocusEffect(
    useCallback(() => {
      buscarProfessor({ ...filters, professorNome: busca });
    }, [buscarProfessor, filters, busca])
  );

  return (
    <View style={{ flex: 1 }}>
      <Carteira title="Professor">
        <CarteiraHeader
          placeholder="Buscar professor..."
          searchValue={busca}
          onSearchChange={setBusca}
          onFilterPress={abrir}
          onAddPress={() => navigation.navigate('ProfessorForm', { mode: 'create' })}
        />
        
        {dados.length === 0 ? (
          <EmptyCarteira />
        ) : (
          dados.map(item => (
            <CarteiraItem
              key={item.professorId}
              icon="account-tie"
              title={item.professorNome}
              description={description(item)}
              onPress={() => navigation.navigate('ProfessorForm', { professorId: item.professorId, mode: 'edit' })}
              onPressDelete={() => {
                setSelectedId(item.professorId ?? null);
                setConfirmVisible(true);
              }}
            />
          ))
        )}
      </Carteira>

      <ConfirmDialog
        visible={confirmVisible}
        title="Excluir professor"
        description="Deseja excluir este professor? Essa ação não poderá ser desfeita."
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
          filters={FiltroProfessor}
          filtroAtual={filters}
          onApply={data => {
            setFilters(data);
            buscarProfessor({ ...data, professorNome: busca });
            fechar();
          }}
          onClear={() => {
            clearFilters();
            buscarProfessor({ professorNome: busca });
            fechar();
          }}
        />
      </FakeBottomSheet>
    </View>
  );
}