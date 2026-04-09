import { z } from 'zod';

export const professorSchema = z.object({
  professorNome: z.string().min(1, "Nome é obrigatório"),
  professorTitulacao: z.string().min(1, "Titulação é obrigatória"),
  professorAreaAtuacao: z.string().min(1, "Área de atuação é obrigatória"),
  professorTempoDocencia: z.coerce.number().min(0, "Tempo de docência é obrigatório"),
  professorEmail: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
});

export type ProfessorFormData = z.infer<typeof professorSchema>;