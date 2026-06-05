import { useState, useCallback, useMemo } from "react";

import { DisciplinaService } from "../../services/disciplinaService";

import {
  type DisciplinaFiltro,
  Disciplina,
} from "../../types/disciplina";

export function useDisciplina() {
  // LISTA ORIGINAL VINDO DA API
  const [dados, setDados] = useState<
    Disciplina[]
  >([]);

  const [loading, setLoading] =
    useState(false);

  /**
   * TEXTO DA BUSCA LOCAL
   */
  const [busca, setBusca] =
    useState("");

  /**
   * BUSCA DISCIPLINAS NA API
   * SEM FILTROS DO FRONTEND
   */
  const buscarDisciplina =
    useCallback(async () => {
      setLoading(true);

      try {
        const response =
          await DisciplinaService.buscarTodas();

        setDados(response || []);
      } catch (error) {
        console.error(
          "Erro ao buscar disciplinas:",
          error,
        );

        setDados([]);

        throw error;
      } finally {
        setLoading(false);
      }
    }, []);

  /**
   * FILTRO LOCAL PELO NOME
   */
  const dadosFiltrados = useMemo(() => {
    const buscaLower = busca
      .toLowerCase()
      .trim();

    // SE NÃO DIGITOU NADA
    if (!buscaLower) {
      return dados;
    }

    return dados.filter(
      (item) =>
        item.disciplinaNome
          ?.toLowerCase()
          .includes(buscaLower),
    );
  }, [dados, busca]);

  /**
   * REMOVE DISCIPLINA
   */
  const deleteDisciplina =
    useCallback(
      async (disciplinaId: string) => {
        setLoading(true);

        try {
          await DisciplinaService.excluir(
            disciplinaId,
          );

          setDados((prev) =>
            prev.filter(
              (d) =>
                d.disciplinaId !==
                disciplinaId,
            ),
          );
        } catch (error) {
          console.error(
            "Erro ao deletar disciplina:",
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
    // LISTA FILTRADA
    dados: dadosFiltrados,

    // LISTA ORIGINAL
    dadosOriginais: dados,

    loading,

    busca,
    setBusca,

    buscarDisciplina,

    deleteDisciplina,
  };
}