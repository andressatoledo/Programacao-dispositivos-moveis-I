export interface Professor {
  professorId?: string;
  professorNome: string;
  professorTitulacao: string;
  professorAreaAtuacao: string;
  professorTempoDocencia: number;
  professorEmail: string;
}


export interface ProfessorFiltro {
  professorId?: string;
  professorNome?: string;
  professorTitulacao?: string;
  professorAreaAtuacao?: string;
  professorTempoDocencia?: number;
  professorEmail?: string;
}