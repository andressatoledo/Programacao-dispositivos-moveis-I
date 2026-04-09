import { FilterFieldConfig } from '../../components/Filtro/types';

export const FiltroCurso: FilterFieldConfig[] = [
  {
    key: 'cursoPeriodo',
    label: 'Período',
    type: 'text',
    placeholder: 'Ex: Matutino, Noturno'
  },

  {
    key: 'cursoMediaAprovacaoMin',
    label: 'Média de aprovação (mínima)',
    type: 'number',
    placeholder: 'Média mínima'
  },
  {
    key: 'cursoMediaAprovacaoMax',
    label: 'Média de aprovação (máxima)',
    type: 'number',
    placeholder: 'Média máxima'
  },

  {
    key: 'cursoDuracaoMin',
    label: 'Duração mínima (semestres)',
    type: 'number',
    placeholder: 'Duração mínima'
  },
  {
    key: 'cursoDuracaoMax',
    label: 'Duração máxima (semestres)',
    type: 'number',
    placeholder: 'Duração máxima'
  }
];