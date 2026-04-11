import { useState, useCallback } from 'react';
import { BoletimService } from '../../services/boletimService';
import { Boletim, BoletimFiltro } from '../../types/boletim';

export function useBoletimAluno(alunoId: string) {
  const [dados, setDados] = useState<Boletim[]>([]);
  const [loading, setLoading] = useState(false);

  const buscarBoletim = useCallback(async (filtros?: BoletimFiltro) => {
    setLoading(true);
    try {
      // 1. Quando você tiver a API pronta, descomente aqui:
      // const response = await BoletimService.buscarTodas({ ...filtros, alunoID: alunoId });
      // setDados(response);

      // 2. ENQUANTO ESTIVER MOCKADO:
      // Colocamos aqui dentro do try, pois o try vazio não pula para o catch.
      setDados([
        { 
          boletimId: '1', 
          alunoID: alunoId, 
          alunoNome: 'Aluno Teste', 
          disciplinaID: '1', 
          disciplinaNome: 'Prog. Dispositivos Móveis I', 
          boletimNota1: 8.5, 
          boletimNota2: 9.0, 
          boletimMedia: 8.8, 
          boletimSituacao: 'Aprovado' 
        },
        { 
          boletimId: '2', 
          alunoID: alunoId, 
          alunoNome: 'Aluno Teste', 
          disciplinaID: '2', 
          disciplinaNome: 'Banco de Dados II', 
          boletimNota1: 7.0, 
          boletimNota2: 6.5, 
          boletimMedia: 6.8, 
          boletimSituacao: 'Em Recuperação' 
        },
        { 
          boletimId: '3', 
          alunoID: alunoId, 
          alunoNome: 'Aluno Teste', 
          disciplinaID: '3', 
          disciplinaNome: 'Redes de Computadores', 
          boletimNota1: 4.0, 
          boletimNota2: 5.0, 
          boletimMedia: 4.5, 
          boletimSituacao: 'Reprovado' 
        },
      ]);

    } catch (error) {
      console.error("Erro real na API:", error);
    } finally {
      setLoading(false);
    }
  }, [alunoId]);

  return { dados, loading, buscarBoletim };
}