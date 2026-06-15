import {
  useEffect,
  useState,
} from "react";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  avisoSchema,
  AvisoFormData,
} from "../../schemas/aviso.schema";

import {
  AvisoService,
} from "../../services/avisoService";

import {
  CursoService,
} from "../../services/cursoService";

import {
  DisciplinaService,
} from "../../services/disciplinaService";

import {
  ComboOption,
} from "../../types/Outros/combo";

import {
  useScreenMode,
} from "../useScreenMode";

import {
  Mode,
} from "../../types/Outros/mode";

export function useAvisoForm(
  mode: Mode,
  avisoId?: string,
) {
  const screen =
    useScreenMode(mode);

  const [loading, setLoading] =
    useState(false);

  const [cursos, setCursos] =
    useState<ComboOption[]>([]);

  const [disciplinas, setDisciplinas] =
    useState<ComboOption[]>([]);

  const [aviso, setAviso] =
    useState<any>(null);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AvisoFormData>({
    resolver:
      zodResolver(avisoSchema),

    defaultValues: {
      avisoTitulo: "",
      avisoMensagem: "",
      cursoId: "",
      disciplinaId: "",
    },
  });

  const cursoId =
    watch("cursoId");

  useEffect(() => {
    carregarCursos();
  }, []);

  useEffect(() => {
    if (!cursoId) {
      setDisciplinas([]);

      setValue(
        "disciplinaId",
        "",
      );

      return;
    }

    carregarDisciplinas(
      cursoId,
    );
  }, [cursoId, setValue]);

  useEffect(() => {
    console.log(avisoId);
    if (
      mode === "create" ||
      !avisoId
    ) {
      return;
    }

    carregarAviso();
  }, [mode, avisoId]);

  async function carregarCursos() {
    try {
      const response =
        await CursoService.buscarCombo();

      setCursos(response);
    } catch (error) {
      console.error(
        "Erro ao carregar cursos:",
        error,
      );
    }
  }

  async function carregarDisciplinas(
    cursoId: string,
  ) {
    try {
      const response =
        await DisciplinaService.buscarComboPorCurso(
          cursoId,
        );

      setDisciplinas(
        response,
      );
    } catch (error) {
      console.error(
        "Erro ao carregar disciplinas:",
        error,
      );
    }
  }

  async function carregarAviso() {
    try {
      setLoading(true);

      const response =
        await AvisoService.buscarPorId(
          avisoId!,
        );

      setAviso(response);

      reset({
        avisoTitulo:
          response.avisoTitulo,

        avisoMensagem:
          response.avisoMensagem,

        cursoId:
          response.cursoId ??
          "",

        disciplinaId:
          response.disciplinaId ??
          "",
      });

      if (
        response.cursoId
      ) {
        await carregarDisciplinas(
          response.cursoId,
        );
      }
    } catch (error) {
      console.error(
        "Erro ao carregar aviso:",
        error,
      );
    } finally {
      setLoading(false);
    }
  }

  async function saveAll(
    data: AvisoFormData,
  ) {
    if (
      mode === "create"
    ) {
      await AvisoService.criar(
        data as any,
      );

      return;
    }

    await AvisoService.atualizar(
      avisoId!,
      data,
    );
  }

  return {
    control,
    errors,
    loading,

    cursos,
    disciplinas,

    aviso,

    handleSubmit,
    saveAll,

    screen,
  };
}