import { z } from 'zod';
import {CursoPeriodoOptions} from '../types/curso';
export const cursoSchema = z.object({
  cursoNome: z.string().min(1, "Nome do curso é obrigatório"),
  cursoPeriodo: z.enum(CursoPeriodoOptions),
  cursoMediaAprovacao: z.coerce.number().min(0.1, "Média de aprovação é obrigatória"),
  cursoDuracao: z.coerce.number().min(1, "Duração é obrigatória"),
});

export type CursoFormData = z.infer<typeof cursoSchema>;