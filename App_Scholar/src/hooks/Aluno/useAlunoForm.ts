import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { alunoSchema, AlunoFormData } from '../../../src/schemas/aluno.schema';
import { AlunoService } from '../../../src/services/alunoService';
import { Mode } from '../../types/Outros/mode';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useScreenMode } from '../../hooks/useScreenMode';
import { useCursoCombo } from '../Curso/useCursoCombo'; 

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function useAlunoForm(mode: Mode, alunoId?: string, navigation?: Navigation) {
  const screen = useScreenMode(mode);
  const { isCreate, setLoading } = screen;

  const { optionsCursos, loadingCursos } = useCursoCombo();

  const form = useForm<AlunoFormData>({
    resolver: zodResolver(alunoSchema),
    defaultValues: {
      alunoNome: 'Andressa',
      alunoMatricula: '123123',
      cursoID: '1',
      alunoEmail: 'asd@gmail.com',
      alunoTelefone: '12998274563',
      alunoCEP: '12312-629',
      alunoEndereco: 'a',
      alunoCidade: 'b',
      alunoEstado: 'b',
      // alunoNome: '',
      // alunoMatricula: '',
      // cursoID: '',
      // alunoEmail: '',
      // alunoTelefone: '',
      // alunoCEP: '',
      // alunoEndereco: '',
      // alunoCidade: '',
      // alunoEstado: '',
    },
  });

  const { control, handleSubmit, reset, formState: { errors } } = form;

  const saveAll = async (data: AlunoFormData) => {
    setLoading(true);
    console.warn("Dados enviados para simulação:", data);
    try {
      console.warn("Dados enviados para simulação:", data);
      await new Promise(resolve => setTimeout(resolve, 500));
      // if (isCreate) {
      //   await AlunoService.criar(data);
      // } else if (alunoId) {
      //   await AlunoService.atualizar(alunoId, data);
      // }
     
    } catch (error: any) {
      console.error("Erro ao salvar aluno:", error);
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (!alunoId || isCreate) return;
    
    // setLoading(true);
    // AlunoService.buscarPorId(alunoId)
    //   .then(dados => reset(dados))
    //   .catch(error => {
    //       console.error("Erro ao carregar aluno:", error);
       
    //   })
    //   .finally(() => setLoading(false));
  }, [alunoId, isCreate, reset, setLoading]);

  return {
    control,
    errors,
    screen,
    optionsCursos,
    loadingCursos,
    handleSubmit,
    saveAll,
  };
}