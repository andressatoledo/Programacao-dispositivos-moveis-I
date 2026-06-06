import { z } from "zod";

export const mudarSenhaSchema = z
  .object({
    senhaAtual: z
      .string()
      .min(1, "Informe a senha atual"),

    novaSenha: z
      .string()
      .min(6, "Mínimo 6 caracteres"),

    confirmarSenha: z.string(),
  })
  .refine(
    (data) =>
      data.novaSenha === data.confirmarSenha,
    {
      message: "As senhas não coincidem",
      path: ["confirmarSenha"],
    }
  );

export type MudarSenhaFormData = z.infer<
  typeof mudarSenhaSchema
>;