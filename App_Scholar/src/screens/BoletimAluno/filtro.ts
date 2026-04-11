import { FilterFieldConfig } from '../../components/Filtro/types';

export const FiltroBoletimAluno: FilterFieldConfig[] = [
  {
    key: 'disciplinaID',
    label: 'Disciplina',
    type: 'combo',
    source: 'disciplinas'
  },
  {
    key: 'boletimSituacao',
    label: 'Situação',
    type: 'combo',
    source: 'boletimSituacao'
  },
  {
    key: 'boletimNota1Min',
    label: 'Nota 1 mínima',
    type: 'number',
    placeholder: 'Filtrar por nota mínima'
  },
  {
    key: 'boletimNota2Min',
    label: 'Nota 2 mínima',
    type: 'number',
    placeholder: 'Filtrar por nota mínima'
  }
];