import { useState, useCallback } from 'react';
import { DisciplinaService } from '../../services/disciplinaService';
import { type DisciplinaFiltro, Disciplina } from '../../types/disciplina';

export function useDisciplina() {
  // Lista de disciplinas carregada da API
  const [dados, setDados] = useState<Disciplina[]>([]);

  const [loading, setLoading] = useState(false);

  /**
   * Busca disciplinas na API com filtros opcionais
   */
  const buscarDisciplina = useCallback(
    async (filtros?: DisciplinaFiltro) => {
      setLoading(true);

      try {
        const response = await DisciplinaService.buscarTodas(filtros);
        setDados(response);
      } catch (error) {
        console.error('Erro ao buscar disciplinas:', error);

        // Limpa dados para evitar inconsistência 
        setDados([]);

        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Remove uma disciplina
   */
  const deleteDisciplina = useCallback(
    async (disciplinaId: string) => {
      setLoading(true);

      try {
        await DisciplinaService.excluir(disciplinaId);

        setDados((prev) =>
          prev.filter((d) => d.disciplinaId !== disciplinaId)
        );
      } catch (error) {
        console.error('Erro ao deletar disciplina:', error);
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
    buscarDisciplina,
    deleteDisciplina,
  };
}