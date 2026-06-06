
export type UserRole = 'aluno' | 'professor' | 'admin';

// export interface Usuario {
//     usuarioId: string;
//     usuarioLogin?: string;
//     usuarioSenha?: string;
//     usuarioNome: string;
//     usuarioEmail?: string;
//     usuarioTelefone?: string;
//     usuarioRole: UserRole;
//     professorId?: string;
//     alunoId?: string;
    
// }

export type Usuario = {
  id: string;
  nome: string;
  email: string;
  role: UserRole;
  alunoId?: string | null;
  professorId?: string | null;
};