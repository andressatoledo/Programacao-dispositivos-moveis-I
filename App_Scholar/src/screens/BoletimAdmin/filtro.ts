import { FilterFieldConfig } from '../../components/Filtro/types';

export const FiltroBoletimAdmin: FilterFieldConfig[] = [
  {
    key: 'disciplinaSemestre',
    label: 'Semestre',
    type: 'number',
    placeholder: 'Ex: 1, 2, 3...',
  },

  {
    key: 'disciplinaNome',
    label: 'Disciplina',
    type: 'text',
    placeholder: 'Ex: Matemática',
  },

];