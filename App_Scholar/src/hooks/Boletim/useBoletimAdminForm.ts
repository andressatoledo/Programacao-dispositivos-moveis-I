import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';

import { boletimSchema, BoletimFormData } from '../../schemas/boletim.schema';
import { Mode } from '../../types/Outros/mode';
import { useScreenMode } from '../../hooks/useScreenMode';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
// import { BoletimService } from '../../services/boletimService';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function useBoletimAdminForm(
  mode: Mode,
  alunoId?: string,
  disciplinaId?: string,
  navigation?: Navigation
) {
  const screen = useScreenMode(mode);
  const { isCreate, setLoading } = screen;

  const form = useForm<BoletimFormData>({
    resolver: zodResolver(boletimSchema),
    defaultValues: {
      alunoID: alunoId || '',
      disciplinaID: disciplinaId || '',
      boletimNota1: 0,
      boletimNota2: 0,
      boletimMedia: 0,
      boletimSituacao: 'Em Recuperação',

      // alunoID: '',
      // disciplinaID: '',
      // boletimNota1: 0,
      // boletimNota2: 0,
      // boletimMedia: 0,
      // boletimSituacao: 'Em Recuperação',
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = form;


  const n1 = watch('boletimNota1');
  const n2 = watch('boletimNota2');

  const media = useMemo(() => {
    if (n1 == null || n2 == null) return 0;
    return (Number(n1) + Number(n2)) / 2;
  }, [n1, n2]);

  const situacao = useMemo(() => {
    if (media >= 7) return 'Aprovado';
    if (media >= 5) return 'Em Recuperação';
    return 'Reprovado';
  }, [media]);

  useEffect(() => {
    form.setValue('boletimMedia', media);
    form.setValue('boletimSituacao', situacao);
  }, [media, situacao]);

  // 🔥 salvar (padrão igual seu)
  const saveAll = async (data: BoletimFormData) => {
    setLoading(true);
    console.warn("Dados enviados para simulação:", data);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      // if (isCreate) {
      //   await BoletimService.criar(data);
      // } else if (alunoId && disciplinaId) {
      //   await BoletimService.atualizar(alunoId, disciplinaId, data);
      // }

    } catch (error: any) {
      console.error("Erro ao salvar boletim:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (!alunoId || !disciplinaId || isCreate) return;

    // setLoading(true);
    // BoletimService.buscarPorAlunoEDisciplina(alunoId, disciplinaId)
    //   .then(dados => reset(dados))
    //   .catch(error => {
    //     console.error("Erro ao carregar boletim:", error);
    //   })
    //   .finally(() => setLoading(false));
  }, [alunoId, disciplinaId, isCreate, reset, setLoading]);

  return {
    control,
    errors,
    screen,
    handleSubmit,
    saveAll,
    media,
    situacao,
  };
}