import { useState, useCallback } from 'react';
import { BoletimService } from '../../services/boletimService';
import { type Boletim } from '../../types/boletim';

export function useBoletimDisciplinaAdmin() {
  const mockBoletins: Boletim[] = [
    {
      boletimId: '1',
      alunoID: '1',
      alunoNome: 'Ana Beatriz Silva',
      disciplinaID: '1',
      disciplinaNome: 'Prog. Dispositivos Móveis I',
      boletimNota1: 8.5,
      boletimNota2: 9.0,
      boletimMedia: 8.8,
      boletimSituacao: 'Aprovado'
    },
    {
      boletimId: '2',
      alunoID: '1',
      alunoNome: 'Ana Beatriz Silva',
      disciplinaID: '2',
      disciplinaNome: 'Banco de Dados II',
      boletimNota1: 7.0,
      boletimNota2: 6.5,
      boletimMedia: 6.8,
      boletimSituacao: 'Aprovado'
    },
    {
      boletimId: '3',
      alunoID: '2',
      alunoNome: 'Bruno Oliveira',
      disciplinaID: '1',
      disciplinaNome: 'Prog. Dispositivos Móveis I',
      boletimNota1: 5.5,
      boletimNota2: 5.0,
      boletimMedia: 5.3,
      boletimSituacao: 'Em Recuperação'
    }
  ];

  const [disciplinasDoAluno, setDisciplinasDoAluno] = useState<Boletim[]>([]);
  const [loading, setLoading] = useState(false);

  /**
   * Buscar disciplinas de um aluno específico
   */
  const buscarDisciplinasDoAluno = useCallback(
    async (alunoId: string, busca?: string) => {
      setLoading(true);

      try {
        const response = await BoletimService.buscarTodas({
          alunoID: alunoId,
        });

        let filtrado = response;

        // 🔍 filtro por nome da disciplina
        if (busca) {
          filtrado = filtrado.filter(d =>
            d.disciplinaNome.toLowerCase().includes(busca.toLowerCase())
          );
        }

        setDisciplinasDoAluno(filtrado);
      } catch (error) {
        console.warn("API Falhou, usando mock (Disciplinas)");

        // 🔥 fallback mock
        let filtradoMock = mockBoletins.filter(
          b => b.alunoID === alunoId
        );

        if (busca) {
          filtradoMock = filtradoMock.filter(d =>
            d.disciplinaNome.toLowerCase().includes(busca.toLowerCase())
          );
        }

        setDisciplinasDoAluno(filtradoMock);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Remover disciplina do aluno
   */
  const deleteDisciplina = useCallback(
    async (boletimId: string) => {
      setLoading(true);

      try {
        // --- SIMULAÇÃO ---
        await new Promise(resolve => setTimeout(resolve, 500));

        // await BoletimService.excluirDisciplina(boletimId);

        setDisciplinasDoAluno(prev =>
          prev.filter(d => d.boletimId !== boletimId)
        );

      } catch (error) {
        console.error("Erro ao remover disciplina:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    disciplinasDoAluno,
    loading,
    buscarDisciplinasDoAluno,
    deleteDisciplina,
  };
}