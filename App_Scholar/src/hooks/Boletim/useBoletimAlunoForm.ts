import { zodResolver } from "@hookform/resolvers/zod";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { RootStackParamList } from "../../navigation/types";
import { BoletimFormData, boletimSchema } from "../../schemas/boletim.schema";
import { Mode } from "../../types/Outros/mode";

import { useAlunoCombo } from "../Aluno/useAlunoCombo";
import { useDisciplinaCombo } from "../Disciplina/useDisciplinaCombo";
import { useScreenMode } from "../useScreenMode";
import { BoletimService } from "../../services/boletimService";

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function useBoletimAlunoForm(
  mode: Mode,
  boletimId?: string,
  navigation?: Navigation,
) {
  const screen = useScreenMode(mode);
  const { isCreate, setLoading } = screen;

  const { optionsAlunos, loadingAlunos } = useAlunoCombo();
  const { optionsDisciplinas, loadingDisciplinas } = useDisciplinaCombo();

  const form = useForm<BoletimFormData>({
    resolver: zodResolver(boletimSchema),
    defaultValues: {
      alunoID: "",
      disciplinaID: "",
      boletimNota1: 0,
      boletimNota2: 0,
      boletimMedia: 0,
      boletimSituacao: "Em Recuperação",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = form;

  const n1 = watch("boletimNota1");
  const n2 = watch("boletimNota2");

  const media = (Number(n1 || 0) + Number(n2 || 0)) / 2;

  const situacao =
    media >= 7
      ? "Aprovado"
      : media >= 5
      ? "Em Recuperação"
      : "Reprovado";

  useEffect(() => {
    setValue("boletimMedia", media);
    setValue("boletimSituacao", situacao);
  }, [media, situacao, setValue]);

  const saveAll = async (data: BoletimFormData) => {
    setLoading(true);

    try {
      if (isCreate) {
        await BoletimService.criar(data);
      } else if (boletimId) {
        await BoletimService.atualizar(boletimId, data);
      }
    } catch (error) {
      console.error("Erro ao salvar boletim:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!boletimId || isCreate) return;

    setLoading(true);

    BoletimService.buscarPorId(boletimId)
      .then((dados) => reset(dados))
      .catch((error) =>
        console.error("Erro ao carregar boletim:", error)
      )
      .finally(() => setLoading(false));
  }, [boletimId, isCreate, reset, setLoading]);

  return {
    control,
    errors,
    screen,
    optionsAlunos,
    optionsDisciplinas,
    loadingAlunos,
    loadingDisciplinas,
    handleSubmit,
    saveAll,
  };
}