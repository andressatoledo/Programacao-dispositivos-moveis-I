export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  erro?: boolean;
}

export class ViaCepService {
  static async buscarCep(cep: string): Promise<ViaCepResponse | null> {
    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      throw new Error("CEP inválido");
    }

    const response = await fetch(
      `https://viacep.com.br/ws/${cleanCep}/json/`
    );

    const data = await response.json();

    if (data.erro) return null;

    return data;
  }
}