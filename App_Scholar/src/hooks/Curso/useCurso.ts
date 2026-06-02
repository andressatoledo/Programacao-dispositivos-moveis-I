import { useState, useCallback } from 'react';
import { CursoService } from '../../services/cursoService';
import { type CursoFiltro, Curso } from '../../types/curso';

export function useCurso() {
  // Lista de cursos carregada da API
  const [dados, setDados] = useState<Curso[]>([]);

  // Controle de carregamento da UI
  const [loading, setLoading] = useState(false);

  /**
   * Busca cursos na API com filtros opcionais
   */
  const buscarCurso = useCallback(
    async (filtros?: CursoFiltro) => {
      setLoading(true);

      try {
        const response = await CursoService.buscarTodas(filtros);
        setDados(response);
      } catch (error) {
        console.error('Erro ao buscar cursos:', error);

        // Em caso de falha, limpa a lista para evitar dados inconsistentes
        setDados([]);

        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Remove um curso pelo ID
   */
  const deleteCurso = useCallback(
    async (cursoId: string) => {
      setLoading(true);

      try {
        await CursoService.excluir(cursoId);

        
        setDados((prev) =>
          prev.filter((c) => c.cursoId !== cursoId)
        );
      } catch (error) {
        console.error('Erro ao deletar curso:', error);
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
    buscarCurso,
    deleteCurso,
  };
}