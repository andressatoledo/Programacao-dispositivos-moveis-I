import {
  useState,
  useCallback,
} from "react";

import { ProfessorService } from "../../services/professorService";

import { Professor } from "../../types/professor";

export function useProfessor() {
  const [dados, setDados] =
    useState<Professor[]>([]);

  const [loading, setLoading] =
    useState(false);

  const buscarProfessor =
    useCallback(
      async () => {
        setLoading(true);

        try {
          const response =
            await ProfessorService.buscarTodas();

          const professores =
            Array.isArray(
              response,
            )
              ? response
              : [];

          setDados(
            professores,
          );
        } catch (error) {
          console.error(
            "Erro ao buscar professores:",
            error,
          );

          setDados([]);
        } finally {
          setLoading(false);
        }
      },
      [],
    );

  const deleteProfessor =
    useCallback(
      async (
        professorId: string,
      ) => {
        setLoading(true);

        try {
          await ProfessorService.excluir(
            professorId,
          );

          setDados(
            (prev) =>
              prev.filter(
                (p) =>
                  p.professorId !==
                  professorId,
              ),
          );
        } catch (error) {
          console.error(
            "Erro ao deletar professor:",
            error,
          );

          throw error;
        } finally {
          setLoading(false);
        }
      },
      [],
    );

  return {
    dados,
    loading,
    buscarProfessor,
    deleteProfessor,
  };
}