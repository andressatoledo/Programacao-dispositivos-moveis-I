export enum CursoPeriodo {
  Matutino = 'Matutino',
  Vespertino = 'Vespertino',
  Noturno = 'Noturno',
  Integral = 'Integral'
}

export interface Curso {
  cursoId?: string;
  cursoNome: string; 
  cursoPeriodo: CursoPeriodo;
  cursoMediaAprovacao?: number; 
  cursoDuracao?: number; 
}

export interface CursoFiltro {
  cursoId?: string;
  cursoNome?: string; 
  cursoPeriodo?: CursoPeriodo;
  cursoMediaAprovacao?: number; 
  cursoDuracao?: number; 
}


export const CursoPeriodoOptions = Object.values(CursoPeriodo) as [
  CursoPeriodo,
  ...CursoPeriodo[]
];