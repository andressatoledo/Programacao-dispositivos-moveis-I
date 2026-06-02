import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';

import {
  boletimSchema,
  type BoletimFormData,
} from '../../schemas/boletim.schema';

import { Mode } from '../../types/Outros/mode';
import { useScreenMode } from '../../hooks/useScreenMode';
import { BoletimService } from '../../services/boletimService';
import {BoletimInput} from '../../types/boletim';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function useBoletimAdminForm(
  mode: Mode,
  boletimId?: string,
  navigation?: Navigation
) {
  const screen = useScreenMode(mode);
  const { isCreate, setLoading } = screen;

  const form = useForm<BoletimFormData>({
    resolver: zodResolver(boletimSchema),
    defaultValues: {
      alunoID: '',
      disciplinaID: '',
      boletimNota1: 0,
      boletimNota2: 0,
      boletimMedia: 0,
      boletimSituacao: 'Em Recuperação',
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const nota1 = watch('boletimNota1');
  const nota2 = watch('boletimNota2');

  const media = useMemo<number>(() => {
  return (Number(nota1 || 0) + Number(nota2 || 0)) / 2;
}, [nota1, nota2]);

  const situacao = useMemo(() => {
    if (media >= 7) return 'Aprovado';
    if (media >= 5) return 'Em Recuperação';
    return 'Reprovado';
  }, [media]);

  useEffect(() => {
  setValue('boletimMedia', media);
  setValue('boletimSituacao', situacao);
}, [media, situacao, setValue]);

  const saveAll = async (data: BoletimFormData) => {
  setLoading(true);

  try {
    const payload: BoletimInput = {
      ...data,
      boletimMedia: data.boletimMedia ?? media,
    };

    if (isCreate) {
      await BoletimService.criar(payload);
    } else if (boletimId) {
      await BoletimService.atualizar(boletimId, payload);
    }
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (!boletimId || isCreate) return;

    setLoading(true);

    BoletimService.buscarPorId(boletimId)
      .then(dados => {
        reset(dados);
      })
      .catch(error => {
        console.error('Erro ao carregar boletim:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [boletimId, isCreate, reset, setLoading]);

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