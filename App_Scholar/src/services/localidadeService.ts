import { api } from "./api";
import { ComboOption } from "../types/Outros/combo";

export const IbgeService = {
  async buscarEstados(): Promise<ComboOption[]> {
    const response = await api.get<any[]>(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );

    return response.data.map((e) => ({
      value: String(e.id),
      label: `${e.nome} (${e.sigla})`,
    }));
  },

  async buscarCidades(ufId: string): Promise<ComboOption[]> {
    const response = await api.get<any[]>(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/municipios`
    );

    return response.data.map((c) => ({
      value: String(c.id),
      label: c.nome,
    }));
  },

  async buscarEstadoPorSigla(sigla: string): Promise<ComboOption | null> {
    const estados = await this.buscarEstados();

    const estado = estados.find(
      (e) => e.label.includes(`(${sigla})`)
    );

    return estado ?? null;
  }
};