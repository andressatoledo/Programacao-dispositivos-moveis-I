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
          const matchBusca =
            !busca ||
            item.disciplina.disciplinaNome
              .toLowerCase()
              .includes(
                busca.toLowerCase(),
              );

          const matchSituacao =
            !filtros?.boletimSituacao ||
            item.boletimSituacao ===
              filtros.boletimSituacao;

          const matchSemestre =
            !filtros?.disciplinaSemestre ||
            item.disciplina
              .disciplinaSemestre ===
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

  const estatisticas =
    useMemo(() => {
      const aprovadas =
        dadosOriginais.filter(
          (x) =>
            x.boletimSituacao ===
            "Aprovado",
        ).length;

      const reprovadas =
        dadosOriginais.filter(
          (x) =>
            x.boletimSituacao ===
            "Reprovado",
        ).length;

      const andamento =
        dadosOriginais.filter(
          (x) =>
            x.boletimSituacao ===
            "EmAndamento",
        ).length;

      const naoCursadas =
        dadosOriginais.filter(
          (x) =>
            x.boletimSituacao ===
            "NaoCursado",
        ).length;

      return {
        aprovadas,
        reprovadas,
        andamento,
        naoCursadas,
      };
    }, [dadosOriginais]);

  const curso =
    dadosOriginais?.[0]?.disciplina
      ?.curso;

  const aluno =
    dadosOriginais?.[0]?.aluno;

  const semestres =
    useMemo(() => {
      const lista =
        dadosOriginais.map(
          (x) =>
            x.disciplina
              .disciplinaSemestre,
        );

      return [
        ...new Set(lista),
      ].sort((a, b) => a - b);
    }, [dadosOriginais]);

  const percentualConclusao =
    useMemo(() => {
      if (
        dadosOriginais.length === 0
      )
        return 0;

      const aprovadas =
        dadosOriginais.filter(
          (x) =>
            x.boletimSituacao ===
            "Aprovado",
        ).length;

      return Math.round(
        (aprovadas /
          dadosOriginais.length) *
          100,
      );
    }, [dadosOriginais]);

  return {
    dadosOriginais,
    loading,
    buscarBoletim,
    filtrarBoletins,
    estatisticas,
    curso,
    aluno,
    semestres,
    percentualConclusao,
  };
}