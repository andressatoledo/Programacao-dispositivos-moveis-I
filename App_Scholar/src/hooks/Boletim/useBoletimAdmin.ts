import { useState, useCallback } from 'react';
import { BoletimService } from '../../services/boletimService';
import { type Boletim, type BoletimFiltro } from '../../types/boletim';

export function useBoletimAdmin() {
  // Mock com dados duplicados (simulando banco relacional) para testar a unificação
  const mockBoletins: Boletim[] = [
    {
      boletimId: '1',
      alunoID: '1',
      alunoNome: 'Ana Beatriz Silva',
      disciplinaID: '1',
      disciplinaNome: 'Prog. Dispositivos Móveis I',
      boletimNota1: 8.5,
      boletimNota2: 9.0,
      boletimMedia: 8.8,
      boletimSituacao: 'Aprovado'
    },
    {
      boletimId: '2',
      alunoID: '1',
      alunoNome: 'Ana Beatriz Silva',
      disciplinaID: '2',
      disciplinaNome: 'Banco de Dados II',
      boletimNota1: 7.0,
      boletimNota2: 6.5,
      boletimMedia: 6.8,
      boletimSituacao: 'Aprovado'
    },
    {
      boletimId: '3',
      alunoID: '2',
      alunoNome: 'Bruno Oliveira',
      disciplinaID: '1',
      disciplinaNome: 'Prog. Dispositivos Móveis I',
      boletimNota1: 5.5,
      boletimNota2: 5.0,
      boletimMedia: 5.3,
      boletimSituacao: 'Em Recuperação'
    }
  ];

  const [alunosUnicos, setAlunosUnicos] = useState<Boletim[]>([]);
  const [loading, setLoading] = useState(false);

  /**
   * Função para buscar e filtrar alunos únicos
   */
  const buscarListaAlunos = useCallback(
    async (filtros?: BoletimFiltro) => {
      setLoading(true);
      try {
        const response = await BoletimService.buscarTodas(filtros);

        // Lógica: Reduz o array para conter apenas um objeto por alunoID
        const filtrados = response.reduce((acc: Boletim[], current) => {
          const jaExiste = acc.find(item => item.alunoID === current.alunoID);
          if (!jaExiste) {
            return acc.concat([current]);
          }
          return acc;
        }, []);

        setAlunosUnicos(filtrados);
      } catch (error) {
        console.warn("API Falhou, aplicando lógica de unificação no mock (Admin)");

        // Aplica a mesma lógica de unificação no Mock para o dev testar a UI
        const filtradosMock = mockBoletins.reduce((acc: Boletim[], current) => {
          const jaExiste = acc.find(item => item.alunoID === current.alunoID);
          if (!jaExiste) return acc.concat([current]);
          return acc;
        }, []);

        setAlunosUnicos(filtradosMock);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Função para excluir registros
   */
  const deleteBoletim = useCallback(
    async (alunoID: string) => {
      setLoading(true);
      try {
        // --- SIMULAÇÃO DE DELETE ---
        await new Promise(resolve => setTimeout(resolve, 1000));

        // await BoletimService.excluir(alunoID); // Aqui dependeria da sua regra de API
        
        // Remove do estado local para feedback imediato na UI
        setAlunosUnicos((prev) => prev.filter((a) => a.alunoID !== alunoID));
        
      } catch (error) {
        console.error("Erro ao deletar registros do aluno:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    alunosUnicos, 
    loading,
    buscarListaAlunos,
    deleteBoletim
  };
}