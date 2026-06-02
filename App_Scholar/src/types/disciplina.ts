export interface Disciplina {
  disciplinaId?: string;
  disciplinaNome: string;
  disciplinaCargaHoraria: number;
  disciplinaSemestre: number;
  professorId: string;       
  professorNome?: string;     
  cursoId: string;           
  cursoNome?: string;         
  
}

export interface DisciplinaFiltro {
  disciplinaId?: string;
  disciplinaNome?: string;
  disciplinaCargaHoraria?: number;
  disciplinaSemestre?: number;
  professorId?: string;       
  professorNome?: string;     
  cursoId?: string;           
  cursoNome?: string;         
  
}
