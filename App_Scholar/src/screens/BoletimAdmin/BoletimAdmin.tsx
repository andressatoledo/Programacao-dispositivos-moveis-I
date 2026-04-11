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

import { useBoletimAdmin } from '../../hooks/Boletim/useBoletimAdmin';
import { useFilterSheet } from '../../hooks/Filter/useFilterSheet';
import { useGenericFilter } from '../../hooks/Filter/useGenericFilter';
import { useMensagem } from '../../hooks/Outros/useMensagem';

import { BoletimFiltro } from '../../types/boletim';
import { RootStackParamList } from '../../navigation/types';
import { TypeMessage } from '@/src/types/Outros/messageType';
import { FiltroBoletimAdmin } from './filtro'; 

export function BoletimAdmin() {
  type NavProp = NativeStackNavigationProp<RootStackParamList, 'BoletimAdmin'>;
  const navigation = useNavigation<NavProp>();
  const showMessage = useMensagem();

  const { visible, abrir, fechar } = useFilterSheet();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const { filters, setFilters, clearFilters } = useGenericFilter<BoletimFiltro>();
  const { alunosUnicos, buscarListaAlunos, deleteBoletim } = useBoletimAdmin();
  const [busca, setBusca] = useState('');

  // Função para deletar todos os registros de boletim do aluno selecionado
  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    try {
      await deleteBoletim(selectedId);
      showMessage('Registros do aluno excluídos com sucesso.', TypeMessage.success);
    } catch (error) {
      showMessage('Erro ao excluir registros do aluno.', TypeMessage.error);
    } finally {
      setConfirmVisible(false);
      setSelectedId(null);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Busca a lista de alunos que possuem boletins
      buscarListaAlunos({ ...filters, alunoNome: busca });
    }, [buscarListaAlunos, filters, busca])
  );

  return (
    <View style={{ flex: 1 }}>
      <Carteira title="Boletins">
        <CarteiraHeader
          placeholder="Buscar aluno..."
          searchValue={busca}
          onSearchChange={setBusca}
          onFilterPress={abrir}
         
        />
        
        {alunosUnicos.length === 0 ? (
          <EmptyCarteira />
        ) : (
          alunosUnicos.map(item => (
            <CarteiraItem
              key={item.alunoID}
              icon="account-school"
              title={item.alunoNome}
              description="Clique para gerenciar notas e disciplinas"
              onPress={() => {
                // Navega para a tela que lista as disciplinas deste aluno específico
                navigation.navigate('BoletimDisciplinaAdmin', { 
                  alunoId: item.alunoID,
                  mode: 'edit' // Na edição, geralmente não mudamos o aluno, apenas as notas/disciplinas
                 
                });
              }}
             
            />
          ))
        )}
      </Carteira>

      <ConfirmDialog
        visible={confirmVisible}
        title="Excluir registros"
        description={`Deseja excluir todos os boletins de ${alunosUnicos.find(a => a.alunoID === selectedId)?.alunoNome}?`}
        confirmText="Excluir tudo"
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
          filters={FiltroBoletimAdmin}
          filtroAtual={filters}
          onApply={data => {
            setFilters(data);
            buscarListaAlunos({ ...data, alunoNome: busca });
            fechar();
          }}
          onClear={() => {
            clearFilters();
            buscarListaAlunos({ alunoNome: busca });
            fechar();
          }}
        />
      </FakeBottomSheet>
    </View>
  );
}