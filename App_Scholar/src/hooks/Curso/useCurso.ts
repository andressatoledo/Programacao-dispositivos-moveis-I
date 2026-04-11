import { useState, useCallback } from 'react';
import { CursoService } from '../../services/cursoService';
import { type CursoFiltro, Curso , CursoPeriodo} from '../../types/curso';

export function useCurso() {
  const mockCursos: Curso[] = [
    {
      cursoId: '1',
      cursoNome: 'Análise e Desenvolvimento de Sistemas',
      cursoPeriodo: CursoPeriodo.Noturno,
      cursoMediaAprovacao: 7,
      cursoDuracao: 5,
    },
    {
      cursoId: '2',
      cursoNome: 'Engenharia de Software',
      cursoPeriodo: CursoPeriodo.Matutino,
      cursoMediaAprovacao: 7.5,
      cursoDuracao: 10,
    }
  ];

  const [dados, setDados] = useState<Curso[]>(mockCursos);
  const [loading, setLoading] = useState(false);

  const buscarCurso = useCallback(
    async (filtros?: CursoFiltro) => {
      setLoading(true);
      try {
        const response = await CursoService.buscarTodas(filtros);
        setDados(response);
      } catch (error) {
        console.warn("API Falhou, mantendo dados locais/mock (Curso)");
        setDados(mockCursos);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteCurso = useCallback(
    async (cursoId: string) => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // await CursoService.excluir(cursoId);
        setDados((prev) => prev.filter((c) => c.cursoId !== cursoId));
      } catch (error) {
        console.error("Erro ao deletar curso:", error);
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
    deleteCurso
  };
}