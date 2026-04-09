export interface Aluno {
  alunoId?: string;
  alunoNome: string;
  alunoMatricula: string;
  cursoID: string;      
  alunoEmail: string;
  alunoTelefone: string;
  alunoCEP: string;
  alunoEndereco: string;
  alunoCidade: string;
  alunoEstado: string;
}

export interface AlunoFiltro {
  alunoId?: string;
  alunoNome?: string;
  alunoMatricula?: string;
  cursoID?: string;      
  cursoNome?: string;   
  alunoEmail?: string;
  alunoTelefone?: string;
  alunoCEP?: string;
  alunoEndereco?: string;
  alunoCidade?: string;
  alunoEstado?: string;
}