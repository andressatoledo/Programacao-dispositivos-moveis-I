export const BoletimSituacaoOptions = [
   'NaoCursado',
  'EmAndamento',
  'Aprovado',
  'Reprovado',
  'EmRecuperacao',
  'Trancado'

] as const;


export type BoletimSituacao =
  (typeof BoletimSituacaoOptions)[number];
  

export interface Boletim {
  boletimId?: string;
  alunoId: string;
  alunoNome?: string;            
  disciplinaId: string;
  disciplinaNome?: string;       
  boletimNota1: number;
  boletimNota2: number;
  boletimMedia: number;
  boletimSituacao: BoletimSituacao;
  disciplina: {
    disciplinaId: string;
    disciplinaNome: string;
    disciplinaSemestre: number;
  };
}

export type BoletimInput = {
  alunoId: string;
  disciplinaId: string;
  boletimNota1: number;
  boletimNota2: number;
  boletimMedia: number;
  boletimSituacao: BoletimSituacao;
};

export interface BoletimFiltro {
  boletimId?: string;
  alunoId?: string;
  alunoNome?: string;            
  disciplinaId?: string;
  disciplinaNome?: string;       
  disciplinaSemestre?: number;
  boletimNota1?: number;
  boletimNota2?: number;
  boletimMedia?: number;
  boletimSituacao?: BoletimSituacao;

}