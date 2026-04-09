import { FilterFieldConfig } from '../../components/Filtro/types';

export const FiltroBoletim: FilterFieldConfig[] = [
  {
    key: 'alunoID',
    label: 'Aluno',
    type: 'combo',
    source: 'aluno'
  },
  {
    key: 'disciplinaID',
    label: 'Disciplina',
    type: 'combo',
    source: 'disciplina'
  },

  {
    key: 'boletimNota1Min',
    label: 'Nota 1 (mínima)',
    type: 'number',
    placeholder: 'Mínimo'
  },
  {
    key: 'boletimNota1Max',
    label: 'Nota 1 (máxima)',
    type: 'number',
    placeholder: 'Máximo'
  },

  {
    key: 'boletimNota2Min',
    label: 'Nota 2 (mínima)',
    type: 'number',
    placeholder: 'Mínimo'
  },
  {
    key: 'boletimNota2Max',
    label: 'Nota 2 (máxima)',
    type: 'number',
    placeholder: 'Máximo'
  },

  {
    key: 'boletimMediaMin',
    label: 'Média (mínima)',
    type: 'number',
    placeholder: 'Média mínima'
  },
  {
    key: 'boletimMediaMax',
    label: 'Média (máxima)',
    type: 'number',
    placeholder: 'Média máxima'
  },
  {
    key: 'boletimSituacao',
    label: 'Situação',
    type: 'combo',
    source: 'boletimSituacao'
  }
];