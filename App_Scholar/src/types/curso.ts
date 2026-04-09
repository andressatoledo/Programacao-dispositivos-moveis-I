export interface CursoPeriodo {
  Manha: 'Manhã';
  Tarde: 'Tarde';
  Noite: 'Noite';
  Integral: 'Integral';
}

export interface Curso {
  cursoId: string;
  cursoNome: string; 
  cursoPeriodo: CursoPeriodo[keyof CursoPeriodo];
  cursoMediaAprovacao?: number; 
  cursoDuracao?: number; 
}

export interface CursoFiltro {
  cursoId?: string;
  cursoNome?: string; 
  cursoPeriodo?: CursoPeriodo[keyof CursoPeriodo];
  cursoMediaAprovacao?: number; 
  cursoDuracao?: number; 
}