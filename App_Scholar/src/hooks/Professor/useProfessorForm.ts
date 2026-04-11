import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { professorSchema, ProfessorFormData } from '../../schemas/professor.schema';
import { ProfessorService } from '../../services/professorService';
import { Mode } from '../../types/Outros/mode';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useScreenMode } from '../../hooks/useScreenMode';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function useProfessorForm(mode: Mode, professorId?: string, navigation?: Navigation) {
  const screen = useScreenMode(mode);
  const { isCreate, setLoading } = screen;

  const form = useForm<ProfessorFormData>({
    resolver: zodResolver(professorSchema),
    defaultValues: {
      professorNome: 'Carlos Alberto',
      professorTitulacao: 'Doutorado',
      professorAreaAtuacao: 'Sistemas Distribuídos',
      professorTempoDocencia: 12,
      professorEmail: 'carlos.alberto@escola.com',
    },
  });

  const { control, handleSubmit, reset, formState: { errors } } = form;

  const saveAll = async (data: ProfessorFormData) => {
    setLoading(true);
    try {
      console.warn("Dados enviados para simulação (Professor):", data);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Lógica real comentada:
      // if (isCreate) {
      //   await ProfessorService.criar(data);
      // } else if (professorId) {
      //   await ProfessorService.atualizar(professorId, data);
      // }
    } catch (error: any) {
      console.error("Erro ao salvar professor:", error);
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Manutenção do padrão: busca de dados comentada
    // if (!professorId || isCreate) return;
    // 
    // setLoading(true);
    // ProfessorService.buscarPorId(professorId)
    //   .then(dados => reset(dados))
    //   .catch(error => console.error("Erro ao carregar professor:", error))
    //   .finally(() => setLoading(false));
  }, [professorId, isCreate, reset, setLoading]);

  return {
    control,
    errors,
    screen,
    handleSubmit,
    saveAll,
  };
}