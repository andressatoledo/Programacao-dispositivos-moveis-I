import { useState, useCallback } from 'react';
import { ProfessorService } from '../../services/professorService';
import { type ProfessorFiltro, Professor } from '../../types/professor';

export function useProfessor() {
  const mockProfessores: Professor[] = [
    {
      professorId: '1',
      professorNome: 'Dr. Roberto Chaves',
      professorTitulacao: 'Doutorado',
      professorAreaAtuacao: 'Inteligência Artificial',
      professorTempoDocencia: 15,
      professorEmail: 'roberto.chaves@escola.com',
    },
    {
      professorId: '2',
      professorNome: 'Me. Eliane Souza',
      professorTitulacao: 'Mestrado',
      professorAreaAtuacao: 'Engenharia de Software',
      professorTempoDocencia: 8,
      professorEmail: 'eliane.souza@escola.com',
    }
  ];

  const [dados, setDados] = useState<Professor[]>(mockProfessores);
  const [loading, setLoading] = useState(false);

  const buscarProfessor = useCallback(
    async (filtros?: ProfessorFiltro) => {
      setLoading(true);
      try {
        const response = await ProfessorService.buscarTodas(filtros);
        setDados(response);
      } catch (error) {
        console.warn("API Falhou, mantendo dados locais/mock (Professor)");
        setDados(mockProfessores);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteProfessor = useCallback(
    async (professorId: string) => {
      setLoading(true);
      try {
        // --- SIMULAÇÃO (Remova quando ProfessorService.excluir estiver pronto) ---
        await new Promise(resolve => setTimeout(resolve, 1000));

        // await ProfessorService.excluir(professorId);
        setDados((prev) => prev.filter((p) => p.professorId !== professorId));
        
      } catch (error) {
        console.error("Erro ao deletar professor:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    dados, 
    loading,
    buscarProfessor,
    deleteProfessor
  };
}