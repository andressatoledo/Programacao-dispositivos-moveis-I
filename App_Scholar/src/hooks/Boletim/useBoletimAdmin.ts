import {
  useState,
  useCallback,
} from "react";

import { BoletimService } from "../../services/boletimService";

import { type Boletim } from "../../types/boletim";

export function useBoletimAdmin() {
  const [dados, setDados] =
    useState<Boletim[]>([]);

  const [loading, setLoading] =
    useState(false);

  const buscarListaAlunos =
    useCallback(async () => {
      setLoading(true);

      try {
        const response =
          await BoletimService.buscarTodas();

        const boletins =
          Array.isArray(response)
            ? response
            : [];

        setDados(boletins);
      } catch (error) {
        console.error(
          "Erro ao buscar boletins:",
          error
        );

        setDados([]);
      } finally {
        setLoading(false);
      }
    }, []);

  const deleteBoletim =
    useCallback(
      async (alunoID: string) => {
        setLoading(true);

        try {
          await new Promise(
            (resolve) =>
              setTimeout(
                resolve,
                1000
              )
          );

          setDados((prev) =>
            prev.filter(
              (item) =>
                item.alunoId !==
                alunoID
            )
          );
        } catch (error) {
          console.error(
            "Erro ao deletar boletim:",
            error
          );

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
    buscarListaAlunos,
    deleteBoletim,
    alunosUnicos: dados,
  };
}