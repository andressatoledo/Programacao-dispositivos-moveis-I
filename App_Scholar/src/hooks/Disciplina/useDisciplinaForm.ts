import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { disciplinaSchema, DisciplinaFormData } from '../../schemas/disciplina.schema';
import { DisciplinaService } from '../../services/disciplinaService';
import { Mode } from '../../types/Outros/mode';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useScreenMode } from '../../hooks/useScreenMode';
import { useProfessorCombo } from '../Professor/useProfessorCombo';
import { useCursoCombo } from '../Curso/useCursoCombo';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function useDisciplinaForm(mode: Mode, disciplinaId?: string, navigation?: Navigation) {
  const screen = useScreenMode(mode);
  const { isCreate, setLoading } = screen;

  const { optionsProfessores, loadingProfessores } = useProfessorCombo();
  const { optionsCursos, loadingCursos } = useCursoCombo();

  const form = useForm<DisciplinaFormData>({
    resolver: zodResolver(disciplinaSchema),
    defaultValues: {
      disciplinaNome: 'Estrutura de Dados',
      disciplinaCargaHoraria: 80,
      disciplinaSemestre: 3,
      professorID: '1',
      cursoID: '1',
    },
  });

  const { control, handleSubmit, reset, formState: { errors } } = form;

  const saveAll = async (data: DisciplinaFormData) => {
    setLoading(true);
    try {
      console.warn("Dados enviados para simulação (Disciplina):", data);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // if (isCreate) {
      //   await DisciplinaService.criar(data);
      // } else if (disciplinaId) {
      //   await DisciplinaService.atualizar(disciplinaId, data);
      // }
    } catch (error: any) {
      console.error("Erro ao salvar disciplina:", error);
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (!disciplinaId || isCreate) return;
    // 
    // setLoading(true);
    // DisciplinaService.buscarPorId(disciplinaId)
    //   .then(dados => reset(dados))
    //   .catch(error => console.error("Erro ao carregar disciplina:", error))
    //   .finally(() => setLoading(false));
  }, [disciplinaId, isCreate, reset, setLoading]);

  return {
    control,
    errors,
    screen,
    optionsProfessores,
    optionsCursos,
    loadingCursos,
    loadingProfessores,
    handleSubmit,
    saveAll,
  };
}