import { FilterFieldConfig } from '../../components/Filtro/types';

export const FiltroDisciplina: FilterFieldConfig[] = [
  {
    key: 'disciplinaNome',
    label: 'Nome da Disciplina',
    type: 'text',
    placeholder: 'Buscar por nome da disciplina'
  },

  {
    key: 'disciplinaCargaHorariaMin',
    label: 'Carga horária (mínima)',
    type: 'number',
    placeholder: 'Mínimo de horas'
  },
  {
    key: 'disciplinaCargaHorariaMax',
    label: 'Carga horária (máxima)',
    type: 'number',
    placeholder: 'Máximo de horas'
  },

  {
    key: 'disciplinaSemestreMin',
    label: 'Semestre (mínimo)',
    type: 'number',
    placeholder: 'Semestre inicial'
  },
  {
    key: 'disciplinaSemestreMax',
    label: 'Semestre (máximo)',
    type: 'number',
    placeholder: 'Semestre final'
  },
  {
    key: 'cursoID',
    label: 'Curso',
    type: 'combo',
    source: 'curso'
  },
  {
    key: 'professorID',
    label: 'Professor',
    type: 'combo',
    source: 'professor'
  }
];