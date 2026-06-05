import {
  useState,
  useCallback,
  useMemo,
} from "react";

import { BoletimService } from "../../services/boletimService";

import { type Boletim } from "../../types/boletim";

export function useBoletimDisciplinaAdmin() {
  const [
    disciplinasDoAluno,
    setDisciplinasDoAluno,
  ] = useState<Boletim[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [busca, setBusca] =
    useState("");

  const buscarDisciplinasDoAluno =
    useCallback(
      async (alunoId: string) => {
        setLoading(true);

        try {
          const response =
            await BoletimService.buscarTodas(
              {
                alunoId,
              },
            );

          setDisciplinasDoAluno(
            response || [],
          );
        } catch (error) {
          console.error(
            "Erro ao buscar disciplinas do aluno:",
            error,
          );

          setDisciplinasDoAluno([]);

          throw error;
        } finally {
          setLoading(false);
        }
      },
      [],
    );

  const disciplinasFiltradas =
    useMemo(() => {
      const buscaLower = busca
        .toLowerCase()
        .trim();

      if (!buscaLower) {
        return disciplinasDoAluno;
      }

      return disciplinasDoAluno.filter(
        (item) =>
          item.disciplina?.disciplinaNome
            ?.toLowerCase()
            .includes(buscaLower),
      );
    }, [
      disciplinasDoAluno,
      busca,
    ]);

  const deleteDisciplina =
    useCallback(
      async (boletimId: string) => {
        setLoading(true);

        try {
          await BoletimService.excluir(
            boletimId,
          );

          setDisciplinasDoAluno(
            (prev) =>
              prev.filter(
                (d) =>
                  d.boletimId !==
                  boletimId,
              ),
          );
        } catch (error) {
          console.error(
            "Erro ao remover disciplina:",
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
    disciplinasDoAluno:
      disciplinasFiltradas,

    dadosOriginais:
      disciplinasDoAluno,

    loading,

    busca,
    setBusca,

    buscarDisciplinasDoAluno,

    deleteDisciplina,
  };
}