export interface Disciplina {
  disciplinaId?: string;
  disciplinaNome: string;
  disciplinaCargaHoraria: number;
  disciplinaSemestre: number;
  professorID: string;       
  professorNome: string;     
  cursoID: string;           
  cursoNome: string;         
  
}

export interface DisciplinaFiltro {
  disciplinaId?: string;
  disciplinaNome?: string;
  disciplinaCargaHoraria?: number;
  disciplinaSemestre?: number;
  professorID?: string;       
  professorNome?: string;     
  cursoID?: string;           
  cursoNome?: string;         
  
}