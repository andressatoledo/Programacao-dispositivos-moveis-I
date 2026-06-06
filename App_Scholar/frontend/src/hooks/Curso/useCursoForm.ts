import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { CursoFormData, cursoSchema } from "../../schemas/curso.schema";
import { CursoService } from "../../services/cursoService";
import { Mode } from "../../types/Outros/mode";
import { useScreenMode } from "../useScreenMode";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { CursoPeriodo } from "../../types/curso";

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function useCursoForm(
  mode: Mode,
  cursoId?: string,
  navigation?: Navigation,
) {
  const screen = useScreenMode(mode);
  const { isCreate, setLoading } = screen;

  const form = useForm<CursoFormData>({
    resolver: zodResolver(cursoSchema),
    defaultValues: {
      cursoNome: "",
      cursoPeriodo: CursoPeriodo.Noturno,
      cursoMediaAprovacao: 0,
      cursoDuracao: 0,
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  /**
   * Salva ou atualiza o curso
   */
  const saveAll = async (data: CursoFormData) => {
    setLoading(true);

    try {
      if (isCreate) {
        await CursoService.criar(data);
      } else if (cursoId) {
        await CursoService.atualizar(cursoId, data);
      }
    } catch (error) {
      console.error("Erro ao salvar curso:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Carrega curso para edição
   */
  useEffect(() => {
    if (!cursoId || isCreate) return;

    setLoading(true);

    CursoService.buscarPorId(cursoId)
      .then((dados) => reset(dados))
      .catch((error) => console.error("Erro ao carregar curso:", error))
      .finally(() => setLoading(false));
  }, [cursoId, isCreate, reset, setLoading]);

  return {
    control,
    errors,
    screen,
    handleSubmit,
    saveAll,
  };
}
