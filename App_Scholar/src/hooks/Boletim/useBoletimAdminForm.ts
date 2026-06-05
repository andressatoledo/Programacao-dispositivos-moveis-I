import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";

import {
  boletimSchema,
  type BoletimFormData,
} from "../../schemas/boletim.schema";

import { Mode } from "../../types/Outros/mode";
import { useScreenMode } from "../useScreenMode";

import { BoletimService } from "../../services/boletimService";

import { BoletimInput } from "../../types/boletim";

export function useBoletimAdminForm(
  mode: Mode,
  boletimId?: string,
  disciplinaId?: string,
  alunoId?: string,
) {
  const screen = useScreenMode(mode);

  const { isCreate, setLoading } = screen;

  const form = useForm<BoletimFormData>({
    resolver: zodResolver(boletimSchema),

    defaultValues: {
      alunoId: alunoId || "",
      disciplinaId: disciplinaId || "",

      boletimNota1: 0,
      boletimNota2: 0,

      boletimMedia: 0,

      boletimSituacao: "Reprovado",
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

  const nota1 = watch("boletimNota1");
  const nota2 = watch("boletimNota2");

  const boletimMedia = watch("boletimMedia");
  const boletimSituacao = watch("boletimSituacao");

  const media = useMemo<number>(() => {
    return Number(((Number(nota1 || 0) + Number(nota2 || 0)) / 2).toFixed(1));
  }, [nota1, nota2]);

  const situacao = useMemo(() => {
    if (media >= 7) return "Aprovado";

    if (media >= 5) return "EmRecuperacao";

    return "Reprovado";
  }, [media]);

  useEffect(() => {
    if (boletimMedia !== media) {
      setValue("boletimMedia", media);
    }

    if (boletimSituacao !== situacao) {
      setValue("boletimSituacao", situacao);
    }
  }, [media, situacao, boletimMedia, boletimSituacao, setValue]);

  const saveAll = async (data: BoletimFormData) => {
    setLoading(true);

    try {
      const payload: BoletimInput = {
        ...data,

        boletimMedia: media,

        boletimSituacao: situacao,
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

    async function carregarBoletim() {
      try {
        setLoading(true);

        const dados = await BoletimService.buscarPorId(boletimId as string);

        if (!dados) {
          console.log("Nenhum dado encontrado");

          return;
        }

        reset({
          alunoId: dados.alunoId || "",

          disciplinaId: dados.disciplinaId || "",

          boletimNota1: Number(dados.boletimNota1 || 0),

          boletimNota2: Number(dados.boletimNota2 || 0),

          boletimMedia: Number(dados.boletimMedia || 0),

          boletimSituacao: dados.boletimSituacao || "Reprovado",
        });

        console.log("Formulário populado");
      } catch (error) {
        console.error("Erro ao carregar boletim:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarBoletim();
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
