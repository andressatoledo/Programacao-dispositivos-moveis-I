import { api } from "./api";

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export const ViaCepService = {
  async buscarCep(cep: string): Promise<ViaCepResponse> {
    const cleanCep = cep.replace(/\D/g, "");

    const response = await api.get<ViaCepResponse>(
      `https://viacep.com.br/ws/${cleanCep}/json/`
    );

    return response.data;
  },
};