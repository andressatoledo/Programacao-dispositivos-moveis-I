import { useState, useCallback } from 'react';
import { AlunoService } from '../../services/alunoService';
import  {type AlunoFiltro, Aluno}   from '../../types/aluno';

export function useCarteira() {
  const mockAlunos = [
    {
      alunoId: '1',
      alunoNome: 'Ana Beatriz Silva',
      alunoMatricula: '2024001',
      cursoID: 'c1',
      cursoNome: 'Análise e Desenvolvimento de Sistemas',
      alunoEmail: 'ana.silva@escola.com',
      alunoTelefone: '(11) 98888-7777',
      alunoCEP: '01234-567',
      alunoEndereco: 'Rua das Flores, 123',
      alunoCidade: 'São Paulo',
      alunoEstado: 'SP'
    },
    {
      alunoId: '2',
      alunoNome: 'Bruno Oliveira',
      alunoMatricula: '2024002',
      cursoID: 'c2',
      cursoNome: 'Engenharia de Software',
      alunoEmail: 'bruno.o@escola.com',
      alunoTelefone: '(11) 97777-6666',
      alunoCEP: '05432-100',
      alunoEndereco: 'Av. Paulista, 1500',
      alunoCidade: 'São Paulo',
      alunoEstado: 'SP'
    }
  ];
  

  const [dados, setDados] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(false);


  const buscarCarteira = useCallback(
  async (filtros?: AlunoFiltro) => {
    setLoading(true);

    try {
      const response = await AlunoService.buscarTodas(filtros);
      setDados(response);
    } finally {
      setLoading(false);
    }
  },
  []
);

   const deleteAluno = useCallback(
  async (alunoId: string) => {
    setLoading(true);
    try {
      await AlunoService.excluir(alunoId);
      setDados((prev) => prev.filter((a) => a.alunoId !== alunoId));
    } finally {
      setLoading(false);
    }
  },
  []
);




  return {
    dados:mockAlunos,
    loading,
    buscarCarteira,
    deleteAluno
  };
}
