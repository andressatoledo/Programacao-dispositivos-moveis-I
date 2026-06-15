import { z } from "zod";

export const avisoSchema = z.object({
  avisoTitulo: z
    .string()
    .min(3, "Informe o título"),

  avisoMensagem: z
    .string()
    .min(5, "Informe a mensagem"),

  cursoId: z
    .string()
    .min(1, "Selecione um curso"),

  disciplinaId: z
    .string()
    .min(1, "Selecione uma disciplina"),
});

export type AvisoFormData = z.infer<typeof avisoSchema>;