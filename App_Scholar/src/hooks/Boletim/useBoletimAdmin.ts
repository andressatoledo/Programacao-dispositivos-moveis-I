import { useState, useCallback } from 'react';
import { BoletimService } from '../../services/boletimService';
import { type Boletim, type BoletimFiltro } from '../../types/boletim';

export function useBoletimAdmin() {
  const [dados, setDados] = useState<Boletim[]>([]);
  const [loading, setLoading] = useState(false);

  const buscarListaAlunos = useCallback(
    async (filtros?: BoletimFiltro) => {
      setLoading(true);

      try {
        const response = await BoletimService.buscarTodas(filtros);

        const boletins = Array.isArray(response) ? response : [];

        const alunosUnicos = boletins.filter(
          (boletim, index, array) =>
            array.findIndex(
              item => item.alunoID === boletim.alunoID
            ) === index
        );

        setDados(alunosUnicos);
      } catch (error) {
        console.error('Erro ao buscar boletins:', error);
        setDados([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteBoletim = useCallback(
    async (alunoID: string) => {
      setLoading(true);

      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        // await BoletimService.excluir(alunoID);

        setDados(prev =>
          Array.isArray(prev)
            ? prev.filter(item => item.alunoID !== alunoID)
            : []
        );
      } catch (error) {
        console.error('Erro ao deletar boletim:', error);
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
  };
}