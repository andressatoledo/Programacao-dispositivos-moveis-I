export interface Aluno {
  alunoId?: string;
  alunoNome: string;
  alunoMatricula: string;
  cursoId: string;      
  alunoEmail: string;
  alunoTelefone: string;
  alunoCep: string;
  alunoEndereco: string;
  alunoCidade: string;
  alunoEstado: string;
}

export interface AlunoFiltro {
  alunoId?: string;
  alunoNome?: string;
  alunoMatricula?: string;
  cursoId?: string;      
  cursoNome?: string;   
  alunoEmail?: string;
  alunoTelefone?: string;
  alunoCep?: string;
  alunoEndereco?: string;
  alunoCidade?: string;
  alunoEstado?: string;
}