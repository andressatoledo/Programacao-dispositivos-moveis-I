import { View } from 'react-native';
import { useState, useCallback } from 'react';
import { Carteira } from '../../../components/Form/Carteira';
import { CarteiraItem } from '../../../components/Form/CarteiraItem';
// import { FilterSheet } from '../../../components/Filtro/FilterSheet';
// import { FakeBottomSheet } from '../../../components/Form/FakeButtonSheet';
import { useCarteira } from '../../../hooks/Curso/useCurso';
// import { useFilterSheet } from '../../../hooks/Filter/useFilterSheet';
// import { useGenericFilter } from '../../../hooks/Filter/useGenericFilter';
// import { AbastecimentoFiltro } from './filtro';
// import type FiltroAbastecimento  from '../../../../shared/types/Abastecimento/abastecimentoFiltro';
import { CarteiraHeader } from '../../../components/Form/CarteiraHeader';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/types'; // ajuste o path
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { Abastecimento as TypeAbastecimento } from '../../../../shared/types/Abastecimento/abastecimento';
import { EmptyCarteira } from '../../../components/Feedback/EmptyCarteira';
// import { ConfirmDialog } from '../../../components/Feedback/ConfirmDialog';
// import { formatarData } from '../../../../shared/utils/formatarData';
// import { formatarValor } from '../../../../shared/utils/formatarValor';

function description(item: TypeAbastecimento): string {
  if (item.caminhaoId && item.abastecimentoLitros && item.abastecimentoValor ) {
    return `${item.caminhaoId.caminhaoNome} - ${item.caminhaoId.caminhaoPlaca} • ${item.abastecimentoLitros} L • ${formatarValor(item.abastecimentoValor)}`;
  }

  return ''
}


export function Curso() {
  type AbastecimentoNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Curso'
  >;

  const navigation = useNavigation<AbastecimentoNavigationProp>();
  // const { visible, abrir, fechar } = useFilterSheet();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { filters, setFilters, clearFilters } =
    useGenericFilter<FiltroAbastecimento>();

  const { dados, buscarCarteira, deleteCurso } = useCarteira();

  const [busca, setBusca] = useState('');

  useFocusEffect(
    useCallback(() => {
      buscarCarteira({
        ...filters,
        abastecimentoObservacao: busca,
      });
    }, [buscarCarteira, filters, busca]),
  );

  return (
    <View style={{ flex: 1 }}>
      <Carteira title="Curso">
        <CarteiraHeader
          placeholder="Pesquisar"
          searchValue={busca}
          onSearchChange={setBusca}
          onFilterPress={abrir}
          onAddPress={() => {
            navigation.navigate('CursoForm', { mode: 'create' });
          }}
        />
        {dados.length === 0 ? (
          <EmptyCarteira />
        ) : (
          dados.map(item => (
            <CarteiraItem
              key={item._id}
              icon="fuel"
             title={item.cursoNome}
              description={description(item)}
              onPress={() => {
                navigation.navigate('CursoForm', {
                  cursoId: item._id,
                  mode: 'edit',
                });
              }}
              onPressDelete={() => {
                setSelectedId(item._id ?? null);
                setConfirmVisible(true);
              }}
              
            />
          ))
        )}
      </Carteira>

      {/* <ConfirmDialog
        visible={confirmVisible}
        title="Excluir abastecimento"
        description="Deseja excluir este abastecimento? Essa ação não poderá ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        danger
        onCancel={() => {
          setConfirmVisible(false);
          setSelectedId(null);
        }}
        onConfirm={() => {
          if (selectedId) {
            deleteAbastecimento(selectedId);
          }
          setConfirmVisible(false);
          setSelectedId(null);
        }}
      /> */}

      {/* <FakeBottomSheet visible={visible} onClose={fechar}>
        <FilterSheet
          filters={AbastecimentoFiltro}
          filtroAtual={filters}
          onApply={data => {
            setFilters(data);
            buscarCarteira({
              ...data,
              abastecimentoObservacao: busca,
            });
            fechar();
          }}
          onClear={() => {
            clearFilters();
            buscarCarteira({ abastecimentoObservacao: busca });
            fechar();
          }}
        />
      </FakeBottomSheet> */}
    </View>
  );
}


// import type { NativeStackScreenProps } from '@react-navigation/native-stack';
// import type { RootStackParamList } from '../../../navigation/types'; // ajuste o path
// // import { useNavigation } from '@react-navigation/native';
// import {Text} from 'react-native';

// type CursoFormProps = NativeStackScreenProps<
//   RootStackParamList,
//   'Curso'
// >;


// export function Curso({
//   route,
//   navigation,
// }: CursoFormProps) {

//   return(<><Text>aaaa</Text></>)
// }
