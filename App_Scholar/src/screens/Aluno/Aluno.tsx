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

import { useCarteira } from '../../hooks/Aluno/useAluno';
import { useFilterSheet } from '../../hooks/Filter/useFilterSheet';
import { useGenericFilter } from '../../hooks/Filter/useGenericFilter';
import { useMensagem } from '../../hooks/Outros/useMensagem'; 
import { Aluno as TypeAluno, AlunoFiltro } from '../../types/aluno';
import { RootStackParamList } from '../../navigation/types';
import { TypeMessage } from '@/src/types/Outros/messageType';
import { FiltroAluno } from './filtro';

function description(item: TypeAluno): string {
  console.log(item);
  return item.alunoEmail && item.alunoTelefone ? `${item.alunoEmail} • ${item.alunoTelefone}` : '';
}

export function Aluno() {
  type AlunoNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Aluno'>;
  const navigation = useNavigation<AlunoNavigationProp>();
  const showMessage = useMensagem();

  const { visible, abrir, fechar } = useFilterSheet();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const { filters, setFilters, clearFilters } = useGenericFilter<AlunoFiltro>();
  const { dados, buscarCarteira, deleteAluno } = useCarteira();
  const [busca, setBusca] = useState('');


  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    try {
      await deleteAluno(selectedId);
      showMessage('Aluno excluído com sucesso.', TypeMessage.success);
    } catch (error) {
      showMessage('Erro ao excluir o aluno.', TypeMessage.error);
    } finally {
      setConfirmVisible(false);
      setSelectedId(null);
    }
  };

  useFocusEffect(
    useCallback(() => {
      buscarCarteira({ ...filters, alunoNome: busca });
    }, [buscarCarteira, filters, busca])
  );

  return (
    <View style={{ flex: 1 }}>
      <Carteira title="Aluno">
        <CarteiraHeader
          placeholder="Buscar aluno..."
          searchValue={busca}
          onSearchChange={setBusca}
          onFilterPress={abrir}
          onAddPress={() => navigation.navigate('AlunoForm', { mode: 'create' })}
        />
        
        {dados.length === 0 ? (
          <EmptyCarteira />
        ) : (
          dados.map(item => (
            <CarteiraItem
              key={item.alunoId}
              icon="school"
              title={item.alunoNome}
              description={description(item)}
              onPress={() => navigation.navigate('AlunoForm', { alunoId: item.alunoId, mode: 'edit' })}
              onPressDelete={() => {
                setSelectedId(item.alunoId ?? null);
                setConfirmVisible(true);
              }}
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

      <FakeBottomSheet visible={visible} onClose={fechar}>
        <FilterSheet
          filters={FiltroAluno}
          filtroAtual={filters}
          onApply={data => {
            setFilters(data);
            buscarCarteira({ ...data, alunoNome: busca });
            fechar();
          }}
          onClear={() => {
            clearFilters();
            buscarCarteira({ alunoNome: busca });
            fechar();
          }}
        />
      </FakeBottomSheet>
    </View>
  );
}