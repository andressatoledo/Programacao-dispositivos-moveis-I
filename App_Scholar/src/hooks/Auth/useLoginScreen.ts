import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../../schemas/login";

export function useLoginScreen() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usuarioLogin: "",
      usuarioSenha: "",
    },
  });

  const { control, handleSubmit, formState: { errors } } = form;

  return {
    control,
    handleSubmit,
    errors,
  };
}