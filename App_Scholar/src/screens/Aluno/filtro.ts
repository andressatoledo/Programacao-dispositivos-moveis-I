import { FilterFieldConfig } from '../../components/Filtro/types';

export const FiltroAluno: FilterFieldConfig[] = [

  {
    key: 'alunoMatricula',
    label: 'Matrícula',
    type: 'text',
    placeholder: 'Buscar por matrícula'
  },
  {
    key: 'cursoID',
    label: 'Curso',
    type: 'combo',
    source: 'curso'
  },
  {
    key: 'alunoEmail',
    label: 'E-mail',
    type: 'text',
    placeholder: 'Buscar por e-mail'
  },
  {
    key: 'alunoCidade',
    label: 'Cidade',
    type: 'text',
    placeholder: 'Buscar por cidade'
  },
  {
    key: 'alunoEstado',
    label: 'Estado',
    type: 'text',
    placeholder: 'Ex: SP, RJ'
  }
];