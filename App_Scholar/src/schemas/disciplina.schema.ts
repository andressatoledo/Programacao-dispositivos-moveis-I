import { z } from 'zod';
export const disciplinaSchema = z.object({
  disciplinaNome: z.string().min(1, "Nome da disciplina é obrigatório"),
  disciplinaCargaHoraria: z.coerce.number().min(1, "Carga horária é obrigatória"),
  disciplinaSemestre: z.coerce.number().min(1, "Semestre é obrigatório"),
  professorID: z.string().min(1, "Professor é obrigatório"),
  cursoID: z.string().min(1, "Curso é obrigatório"),
});

export type DisciplinaFormData = z.infer<typeof disciplinaSchema>;