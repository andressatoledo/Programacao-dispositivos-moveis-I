import { useState, useCallback } from 'react';
import { ProfessorService } from '../../services/professorService';
import { type ProfessorFiltro, Professor } from '../../types/professor';

export function useProfessor() {
  // Lista de professores vinda da API
  const [dados, setDados] = useState<Professor[]>([]);

  // Controle de loading da interface
  const [loading, setLoading] = useState(false);

  /**
   * Busca professores na API com filtros opcionais
   */
  const buscarProfessor = useCallback(
    async (filtros?: ProfessorFiltro) => {
      setLoading(true);

      try {
        const response = await ProfessorService.buscarTodas(filtros);
        setDados(response);
      } catch (error) {
        console.error('Erro ao buscar professores:', error);

        // Limpa estado para evitar inconsistência de dados
        setDados([]);

        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Remove um professor pelo ID
   */
  const deleteProfessor = useCallback(
    async (professorId: string) => {
      setLoading(true);

      try {
        await ProfessorService.excluir(professorId);

        // Atualização otimista da UI
        setDados((prev) =>
          prev.filter((p) => p.professorId !== professorId)
        );
      } catch (error) {
        console.error('Erro ao deletar professor:', error);
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
    deleteProfessor,
  };
}