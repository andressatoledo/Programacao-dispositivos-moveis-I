import { FilterFieldConfig } from '../../components/Filtro/types';

export const FiltroBoletimAdmin: FilterFieldConfig[] = [
  {
    key: 'alunoID',
    label: 'Aluno',
    type: 'combo',
    source: 'alunos'
  },
  {
    key: 'disciplinaID',
    label: 'Disciplina',
    type: 'combo',
    source: 'disciplinas'
  },
  {
    key: 'disciplinaSemestre',
    label: 'Semestre',
    type: 'number',
    placeholder: 'Ex: 1, 2, 3...'
  },
 
];