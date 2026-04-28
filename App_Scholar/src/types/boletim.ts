export const BoletimSituacaoOptions = [
  'Aprovado',
  'Reprovado',
  'Em Recuperação'
] as const;


export type BoletimSituacao =
  (typeof BoletimSituacaoOptions)[number];
  

export interface Boletim {
  boletimId?: string;
  alunoID: string;
  alunoNome: string;            
  disciplinaID: string;
  disciplinaNome: string;       
  boletimNota1: number;
  boletimNota2: number;
  boletimMedia: number;
  boletimSituacao: BoletimSituacao;
}


export interface BoletimFiltro {
  boletimId?: string;
  alunoID?: string;
  alunoNome?: string;            
  disciplinaID?: string;
  disciplinaNome?: string;       
  disciplinaSemestre?: number;
  boletimNota1?: number;
  boletimNota2?: number;
  boletimMedia?: number;
  boletimSituacao?: BoletimSituacao;
}