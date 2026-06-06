import { api } from "./api";

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  usuario: {
    id: string;
    nome: string;
    email: string;
    role: "admin" | "professor" | "aluno";
  };
}

export const AuthService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    console.log("Login data:", data); // Log dos dados de login
    const response = await api.post<LoginResponse>("/auth/login", data);
    return response.data;
  },

  async mudarSenha(data: {
  senhaAtual: string;
  novaSenha: string;
}) {
  const response = await api.put(
    "/auth/mudar-senha",
    data
  );

 
  return response.data;
}
};