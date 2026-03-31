export interface Curso {
  cursoId: string;
  cursoNome: string; 
  cursoPeriodo: 'Manhã' | 'Tarde' | 'Noite' | 'Integral';
  cursoMediaAprovacao?: number; // Ex: 6 ou 7
  cursoDuracao?: number; // Duração em semestres, ex: 6 ou 8
}