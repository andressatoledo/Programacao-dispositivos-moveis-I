import { z } from 'zod';

export const cursoSchema = z.object({
  cursoNome: z.string().min(1, "Nome do curso é obrigatório"),
  cursoPeriodo: z.string().min(1, "Período é obrigatório"),
  cursoMediaAprovacao: z.coerce.number().min(0.1, "Média de aprovação é obrigatória"),
  cursoDuracao: z.coerce.number().min(1, "Duração é obrigatória"),
});

export type CursoFormData = z.infer<typeof cursoSchema>;