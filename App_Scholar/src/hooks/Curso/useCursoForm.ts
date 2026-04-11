import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { cursoSchema, CursoFormData } from '../../schemas/curso.schema';
import { CursoService } from '../../services/cursoService';
import { Mode } from '../../types/Outros/mode';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useScreenMode } from '../../hooks/useScreenMode';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function useCursoForm(mode: Mode, cursoId?: string, navigation?: Navigation) {
  const screen = useScreenMode(mode);
  const { isCreate, setLoading } = screen;

  const form = useForm<CursoFormData>({
    resolver: zodResolver(cursoSchema),
    defaultValues: {
      cursoNome: 'Sistemas de Informação',
      cursoPeriodo: 'Noturno',
      cursoMediaAprovacao: 7,
      cursoDuracao: 8,
    },
  });

  const { control, handleSubmit, reset, formState: { errors } } = form;

  const saveAll = async (data: CursoFormData) => {
    setLoading(true);
    try {
      console.warn("Dados enviados para simulação (Curso):", data);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // if (isCreate) {
      //   await CursoService.criar(data);
      // } else if (cursoId) {
      //   await CursoService.atualizar(cursoId, data);
      // }
    } catch (error: any) {
      console.error("Erro ao salvar curso:", error);
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (!cursoId || isCreate) return;
    // 
    // setLoading(true);
    // CursoService.buscarPorId(cursoId)
    //   .then(dados => reset(dados))
    //   .catch(error => console.error("Erro ao carregar curso:", error))
    //   .finally(() => setLoading(false));
  }, [cursoId, isCreate, reset, setLoading]);

  return {
    control,
    errors,
    screen,
    handleSubmit,
    saveAll,
  };
}