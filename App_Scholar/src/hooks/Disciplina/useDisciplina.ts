import { useState, useCallback } from 'react';
import { DisciplinaService } from '../../services/disciplinaService';
import { type DisciplinaFiltro, Disciplina } from '../../types/disciplina';

export function useDisciplina() {
  const mockDisciplinas: Disciplina[] = [
    {
      disciplinaId: '1',
      disciplinaNome: 'Estrutura de Dados',
      disciplinaCargaHoraria: 80,
      disciplinaSemestre: 3,
      professorID: 'p1',
      professorNome: 'Dr. Roberto Chaves',
      cursoID: 'c1',
      cursoNome: 'Análise e Desenvolvimento de Sistemas',
    },
    {
      disciplinaId: '2',
      disciplinaNome: 'Cálculo Diferencial',
      disciplinaCargaHoraria: 60,
      disciplinaSemestre: 1,
      professorID: 'p2',
      professorNome: 'Me. Eliane Souza',
      cursoID: 'c2',
      cursoNome: 'Engenharia de Software',
    }
  ];

  const [dados, setDados] = useState<Disciplina[]>([]);
  const [loading, setLoading] = useState(false);

  /**
   * buscarDisciplina agora recebe filtros que podem incluir o professorID.
   * Se o professorID for passado, e a API falhar, filtramos o mock localmente.
   */
  const buscarDisciplina = useCallback(
    async (filtros?: DisciplinaFiltro) => {
      setLoading(true);
      try {
        const response = await DisciplinaService.buscarTodas(filtros);
        setDados(response);
      } catch (error) {
        console.warn("API Falhou, aplicando filtro nos dados mock (Disciplina)");
        
        // Lógica de fallback: Se houver um filtro de professorID, filtramos o mock
        let resultadoMock = mockDisciplinas;
        
        if (filtros?.professorID) {
          resultadoMock = mockDisciplinas.filter(
            d => d.professorID === filtros.professorID
          );
        }

        setDados(resultadoMock);
        // Opcional: throw error; (Removido para não quebrar a UI se o mock for suficiente)
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteDisciplina = useCallback(
    async (disciplinaId: string) => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // await DisciplinaService.excluir(disciplinaId);
        setDados((prev) => prev.filter((d) => d.disciplinaId !== disciplinaId));
      } catch (error) {
        console.error("Erro ao deletar disciplina:", error);
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
    deleteDisciplina
  };
}