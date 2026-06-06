import { z } from 'zod';

export const alunoSchema = z.object({
  alunoNome: z.string().min(1, "Nome é obrigatório"),
  alunoMatricula: z.string().min(1, "Matrícula é obrigatória"),
  cursoId: z.string().min(1, "O curso deve ser selecionado"),
  alunoEmail: z
  .string()
  .min(1, "E-mail é obrigatório")
  .email("E-mail inválido")
  .refine(
    (email) => email.toLowerCase().endsWith("@aluno.appscholar.com"),
    {
      message: "O e-mail deve pertencer ao domínio @aluno.appscholar.com",
    }
  ),
  alunoTelefone: z.string().min(1, "Telefone é obrigatório"),
  alunoCep: z
    .string()
    .min(1, "CEP é obrigatório")
    .regex(/^\d{5}-\d{3}$/, "Formato de CEP inválido (00000-000)"),

  alunoEndereco: z.string().min(1, "Endereço é obrigatório"),
  alunoCidade: z.string().min(1, "Cidade é obrigatória"),
  alunoEstado: z.string().min(1, "Estado é obrigatório"),
});

export type AlunoFormData = z.infer<typeof alunoSchema>;