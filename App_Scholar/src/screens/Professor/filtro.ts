import { FilterFieldConfig } from '../../components/Filtro/types';
export const FiltroProfessor: FilterFieldConfig[] = [

  {
    key: 'professorTitulacao',
    label: 'Titulação',
    type: 'text',
    placeholder: 'Ex: Mestre, Doutor'
  },
  {
    key: 'professorAreaAtuacao',
    label: 'Área de Atuação',
    type: 'text',
    placeholder: 'Ex: Exatas, Humanas'
  },

  {
    key: 'professorTempoDocenciaMin',
    label: 'Tempo de docência (mínimo em anos)',
    type: 'number',
    placeholder: 'Mínimo de anos'
  },
  {
    key: 'professorTempoDocenciaMax',
    label: 'Tempo de docência (máximo em anos)',
    type: 'number',
    placeholder: 'Máximo de anos'
  },
  {
    key: 'professorEmail',
    label: 'E-mail',
    type: 'text',
    placeholder: 'Buscar por e-mail'
  }
];