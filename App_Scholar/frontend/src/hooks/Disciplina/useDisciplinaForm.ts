import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
    DisciplinaFormData,
    disciplinaSchema,
} from "../../schemas/disciplina.schema";

import { DisciplinaService } from "../../services/disciplinaService";
import { Mode } from "../../types/Outros/mode";
import { useScreenMode } from "../useScreenMode";

import { useCursoCombo } from "../Curso/useCursoCombo";
import { useProfessorCombo } from "../Professor/useProfessorCombo";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function useDisciplinaForm(
  mode: Mode,
  disciplinaId?: string,
  navigation?: Navigation,
) {
  const screen = useScreenMode(mode);
  const { isCreate, setLoading } = screen;

  const { optionsProfessores, loadingProfessores } = useProfessorCombo();
  const { optionsCursos, loadingCursos } = useCursoCombo();

  const form = useForm<DisciplinaFormData>({
    resolver: zodResolver(disciplinaSchema),
    defaultValues: {
      disciplinaNome: "",
      disciplinaCargaHoraria: 0,
      disciplinaSemestre: 1,
      professorId: "",
      cursoId: "",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  /**
   * Salva ou atualiza disciplina
   */
  const saveAll = async (data: DisciplinaFormData) => {
    setLoading(true);

    try {
      if (isCreate) {
        await DisciplinaService.criar(data);
      } else if (disciplinaId) {
        await DisciplinaService.atualizar(disciplinaId, data);
      }
    } catch (error) {
      console.error("Erro ao salvar disciplina:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Carrega disciplina para edição
   */
  useEffect(() => {
    if (!disciplinaId || isCreate) return;

    setLoading(true);

    DisciplinaService.buscarPorId(disciplinaId)
      .then((dados) => reset(dados))
      .catch((error) => console.error("Erro ao carregar disciplina:", error))
      .finally(() => setLoading(false));
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
