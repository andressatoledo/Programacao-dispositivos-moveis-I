import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
    MudarSenhaFormData,
    mudarSenhaSchema,
} from "../../schemas/mudarSenha.schema";

export function useMudarSenhaForm() {
  return useForm<MudarSenhaFormData>({
    resolver: zodResolver(mudarSenhaSchema),

    defaultValues: {
      senhaAtual: "",
      novaSenha: "",
      confirmarSenha: "",
    },
  });
}
