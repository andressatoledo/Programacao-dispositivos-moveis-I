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

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function useBoletimAlunoForm(
  mode: Mode,
  alunoId?: string,
  navigation?: Navigation,
) {
  const screen = useScreenMode(mode);
  const { isCreate, setLoading } = screen;

  const { optionsAlunos, loadingAlunos } = useAlunoCombo();
  const { optionsDisciplinas, loadingDisciplinas } = useDisciplinaCombo();

  const form = useForm<BoletimFormData>({
    resolver: zodResolver(boletimSchema),
    defaultValues: {
      alunoID: "1",
      disciplinaID: "1",
      boletimNota1: 8.5,
      boletimNota2: 7.0,
      boletimMedia: 7.75,
      boletimSituacao: "Aprovado",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const saveAll = async (data: BoletimFormData) => {
    setLoading(true);
    try {
      console.warn("Dados enviados para simulação (Boletim):", data);
      await new Promise((resolve) => setTimeout(resolve, 500));

      // if (isCreate) {
      //   await BoletimService.criar(data);
      // } else if (boletimId) {
      //   await BoletimService.atualizar(boletimId, data);
      // }
    } catch (error: any) {
      console.error("Erro ao salvar boletim:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (!boletimId || isCreate) return;
    //
    // setLoading(true);
    // BoletimService.buscarPorId(boletimId)
    //   .then(dados => reset(dados))
    //   .catch(error => console.error("Erro ao carregar boletim:", error))
    //   .finally(() => setLoading(false));
  }, [alunoId, isCreate, reset, setLoading]);

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
