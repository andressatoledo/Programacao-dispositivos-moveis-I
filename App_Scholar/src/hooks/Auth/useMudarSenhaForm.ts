import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  mudarSenhaSchema,
  MudarSenhaFormData,
} from "@/src/schemas/mudarSenha.schema";

export function useMudarSenhaForm() {
  return useForm<MudarSenhaFormData>({
    resolver: zodResolver(
      mudarSenhaSchema
    ),

    defaultValues: {
      senhaAtual: "",
      novaSenha: "",
      confirmarSenha: "",
    },
  });
}