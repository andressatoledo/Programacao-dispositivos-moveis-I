import { useState, useCallback } from "react";

import { CursoService } from "../../services/cursoService";

import { Curso } from "../../types/curso";

export function useCurso() {
  const [dados, setDados] =
    useState<Curso[]>([]);

  const [loading, setLoading] =
    useState(false);

  const buscarCurso =
    useCallback(
      async () => {
        setLoading(true);

        try {
          const response =
            await CursoService.buscarTodas();

          const cursos =
            Array.isArray(
              response,
            )
              ? response
              : [];

          setDados(cursos);
        } catch (error) {
          console.error(
            "Erro ao buscar cursos:",
            error,
          );

          setDados([]);
        } finally {
          setLoading(false);
        }
      },
      [],
    );

  const deleteCurso =
    useCallback(
      async (
        cursoId: string,
      ) => {
        setLoading(true);

        try {
          await CursoService.excluir(
            cursoId,
          );

          setDados(
            (prev) =>
              prev.filter(
                (c) =>
                  c.cursoId !==
                  cursoId,
              ),
          );
        } catch (error) {
          console.error(
            "Erro ao deletar curso:",
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
    buscarCurso,
    deleteCurso,
  };
}