import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
    ProfessorFormData,
    professorSchema,
} from "../../schemas/professor.schema";

import { ProfessorService } from "../../services/professorService";
import { Mode } from "../../types/Outros/mode";
import { useScreenMode } from "../useScreenMode";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function useProfessorForm(
  mode: Mode,
  professorId?: string,
  navigation?: Navigation,
) {
  const screen = useScreenMode(mode);
  const { isCreate, setLoading } = screen;

  const form = useForm<ProfessorFormData>({
    resolver: zodResolver(professorSchema),
    defaultValues: {
      professorNome: "",
      professorTitulacao: "",
      professorAreaAtuacao: "",
      professorTempoDocencia: 0,
      professorEmail: "",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  /**
   * Cria ou atualiza professor
   */
  const saveAll = async (data: ProfessorFormData) => {
    setLoading(true);

    try {
      if (isCreate) {
        await ProfessorService.criar(data);
      } else if (professorId) {
        await ProfessorService.atualizar(professorId, data);
      }
    } catch (error) {
      console.error("Erro ao salvar professor:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Carrega professor para edição
   */
  useEffect(() => {
    if (!professorId || isCreate) return;

    setLoading(true);

    ProfessorService.buscarPorId(professorId)
      .then((dados) => reset(dados))
      .catch((error) => console.error("Erro ao carregar professor:", error))
      .finally(() => setLoading(false));
  }, [professorId, isCreate, reset, setLoading]);

  return {
    control,
    errors,
    screen,
    handleSubmit,
    saveAll,
  };
}
