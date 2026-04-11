import { View } from 'react-native';
import { InputField } from '../Form/InputField';
import { Button } from '../Form/Button';

interface Props {
  searchValue?: string;
  onSearchChange?: (text: string) => void;
  // Propriedades de press agora são opcionais (?)
  onFilterPress?: () => void;
  onAddPress?: () => void;
  placeholder?: string;
  hideAdd?: boolean;
  hideFilter?: boolean;
  hideSearch?: boolean;
}

export function CarteiraHeader({
  searchValue = '',
  onSearchChange,
  onFilterPress,
  onAddPress,
  placeholder = 'Buscar...',
  hideAdd = false,
  hideFilter = false,
  hideSearch = false,
}: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
      }}
    >
      {/* Só renderiza a busca se não estiver oculta E houver função de mudança */}
      {!hideSearch && onSearchChange && (
        <View style={{ flex: 1 }}>
          <InputField
            label=''
            placeholder={placeholder}
            value={searchValue}
            onChangeText={onSearchChange}
            icon="magnify"
            iconPosition='inside'
            marginBottom={-10}
          />
        </View>
      )}

      {/* Só renderiza o filtro se não estiver oculto E a função onFilterPress existir */}
      {!hideFilter && onFilterPress && (
        <Button
          icon="filter-variant"
          onPress={onFilterPress}
          label=''
          borderRadius={50}
          paddingHorizontal={15}
          marginTop={10}
        />
      )}

      {/* Só renderiza o adicionar se não estiver oculto E a função onAddPress existir */}
      {!hideAdd && onAddPress && (
        <Button
          icon="plus"
          onPress={onAddPress}
          label=''
          borderRadius={50}
          paddingHorizontal={15}
          marginTop={10}
        />
      )}
    </View>
  );
}