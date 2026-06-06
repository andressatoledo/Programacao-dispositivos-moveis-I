import { z } from 'zod';
import {BoletimSituacaoOptions } from '../types/boletim';

export const boletimSchema = z.object({
  alunoId: z.string().min(1, "Aluno é obrigatório"),
  disciplinaId: z.string().min(1, "Disciplina é obrigatória"),
  boletimNota1: z.coerce.number().min(0, "Nota 1 é obrigatória").max(10, "Máximo 10"),
  boletimNota2: z.coerce.number().min(0, "Nota 2 é obrigatória").max(10, "Máximo 10"),

  //Fazer o cálculo posteriomente
  boletimMedia: z.coerce.number(),
  boletimSituacao: z.enum(BoletimSituacaoOptions),
});

export type BoletimFormData = z.infer<typeof boletimSchema>;