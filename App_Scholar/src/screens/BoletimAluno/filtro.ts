import { FilterFieldConfig } from '../../components/Filtro/types';

export const FiltroBoletimAluno: FilterFieldConfig[] = [

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
  },
//   {
//   key: "disciplinaSemestre",
//   label: "Semestre",
//   type: "select",
//   options: [
//     { label: "1º Semestre", value: 1 },
//     { label: "2º Semestre", value: 2 },
//     { label: "3º Semestre", value: 3 },
//     { label: "4º Semestre", value: 4 },
//     { label: "5º Semestre", value: 5 },
//     { label: "6º Semestre", value: 6 },
//     { label: "Todos", value: undefined },
//   ],
// }
];