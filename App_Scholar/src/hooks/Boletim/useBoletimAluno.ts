import { useState, useCallback, useEffect } from "react";
import { BoletimService } from "../../services/boletimService";
import { Boletim, BoletimFiltro } from "../../types/boletim";
import { useAuth } from "../Auth/useAuth";

export function useBoletimAluno() {
  const { user } = useAuth();

  const alunoId = user?.alunoId;
  const [dados, setDados] = useState<Boletim[]>([]);
  const [loading, setLoading] = useState(false);

  const buscarBoletim = useCallback(
    async (filtros?: BoletimFiltro) => {
      if (!alunoId) return;

      setLoading(true);

      try {
        const response = await BoletimService.buscarTodas({
          ...filtros,
          alunoId,
        });

        setDados(response);
      } catch (error) {
        console.error("Erro ao buscar boletim:", error);
      } finally {
        setLoading(false);
      }
    },
    [alunoId]
  );

  useEffect(() => {
    if (alunoId) {
      buscarBoletim();
    }
  }, [alunoId]);

  return {
    dados,
    loading,
    buscarBoletim,
  };
}