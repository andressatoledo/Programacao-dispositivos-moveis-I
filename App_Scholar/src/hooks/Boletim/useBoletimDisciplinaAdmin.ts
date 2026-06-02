import { useState, useCallback } from 'react';
import { BoletimService } from '../../services/boletimService';
import { type Boletim } from '../../types/boletim';

export function useBoletimDisciplinaAdmin() {
  // Lista de disciplinas (boletins) do aluno selecionado
  const [disciplinasDoAluno, setDisciplinasDoAluno] = useState<Boletim[]>([]);

  // Estado de loading para controle da UI
  const [loading, setLoading] = useState(false);

  /**
   * Busca todas as disciplinas de um aluno específico.
   * Permite filtro opcional por nome da disciplina.
   */
  const buscarDisciplinasDoAluno = useCallback(
    async (alunoId: string, busca?: string) => {
      setLoading(true);

      try {
        // Busca na API filtrando pelo aluno
        const response = await BoletimService.buscarTodas({
          alunoID: alunoId,
        });

        let filtrado = response;

        // // Filtro opcional por nome da disciplina (frontend)
        // if (busca) {
        //   filtrado = filtrado.filter((d) =>
        //     d.disciplinaNome.toLowerCase().includes(busca.toLowerCase())
        //   );
        // }

        setDisciplinasDoAluno(filtrado);
      } catch (error) {
        console.error('Erro ao buscar disciplinas do aluno:', error);

        // Em caso de erro, limpa estado para evitar dados inconsistentes
        setDisciplinasDoAluno([]);

        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Remove uma disciplina (boletim) do aluno
   */
  const deleteDisciplina = useCallback(
    async (boletimId: string) => {
      setLoading(true);

      try {
        await BoletimService.excluir(boletimId);

        // Atualização otimista da UI
        setDisciplinasDoAluno((prev) =>
          prev.filter((d) => d.boletimId !== boletimId)
        );
      } catch (error) {
        console.error('Erro ao remover disciplina:', error);
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