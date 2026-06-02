// src/config/dashboardResumo.ts

export type ResumoItem = {
  resumoKey: string;
  label: string;
  icon: string;
  color: string;
  roles: ('aluno' | 'professor' | 'admin')[];
};

export const dashboardResumoConfig: ResumoItem[] = [
  {
    resumoKey: 'alunos',
    label: 'Alunos',
    icon: 'account-group',
    color: '#4CAF50',
    roles: ['admin', 'professor'],
  },
  {
    resumoKey: 'professores',
    label: 'Professores',
    icon: 'school',
    color: '#FF9800',
    roles: ['admin'],
  },
  {
    resumoKey: 'disciplinas',
    label: 'Disciplinas',
    icon: 'book-open-variant',
    color: '#2196F3',
    roles: ['admin', 'professor', 'aluno'],
  },
  {
    resumoKey: 'boletins',
    label: 'Boletins',
    icon: 'file-document-outline',
    color: '#FF5722',
    roles: ['admin'],
  },
];