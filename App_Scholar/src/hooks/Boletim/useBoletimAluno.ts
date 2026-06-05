import {
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";

import { BoletimService } from "../../services/boletimService";

import {
  Boletim,
  BoletimFiltro,
} from "../../types/boletim";

export function useBoletimAluno() {
  const [dadosOriginais, setDadosOriginais] =
    useState<Boletim[]>([]);

  const [loading, setLoading] =
    useState(false);

  const buscarBoletim = useCallback(
    async () => {
      setLoading(true);

      try {
        const response =
          await BoletimService.buscarTodas();

        setDadosOriginais(response);
      } catch (error) {
        console.error(
          "Erro ao buscar boletim:",
          error,
        );
      } finally {
        setLoading(false);
      }
    },

    [],
  );

  useEffect(() => {
    buscarBoletim();
  }, [buscarBoletim]);

  const filtrarBoletins = useCallback(
    (
      busca: string,
      filtros?: BoletimFiltro,
    ) => {
      return dadosOriginais.filter(
        (item) => {
          // BUSCA TEXTO
          const matchBusca =
            !busca ||
            item.disciplina?.disciplinaNome
              ?.toLowerCase()
              .includes(
                busca.toLowerCase(),
              );

          // FILTRO SITUAÇÃO
          const matchSituacao =
            !filtros?.boletimSituacao ||
            item.boletimSituacao ===
              filtros.boletimSituacao;

          // FILTRO SEMESTRE
          const matchSemestre =
            !filtros?.disciplinaSemestre ||
            item.disciplina
              ?.disciplinaSemestre ===
              filtros.disciplinaSemestre;

          return (
            matchBusca &&
            matchSituacao &&
            matchSemestre
          );
        },
      );
    },

    [dadosOriginais],
  );

  return {
    dadosOriginais,
    loading,
    buscarBoletim,
    filtrarBoletins,
  };
}