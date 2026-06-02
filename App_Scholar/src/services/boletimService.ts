
import { api } from './api';
import {type BoletimFiltro, Boletim} from '../types/boletim';
import { ComboOption } from '../types/Outros/combo';

const ENDPOINT = '/boletins';

export const BoletimService = {
  async buscarTodas(filtro?: BoletimFiltro): Promise<Boletim[]> {
    const response = await api.get<Boletim[]>(ENDPOINT, { params: filtro});
    console.log("Resposta do servidor:", response.data);
    return response.data;
  },

  async buscarCombo(): Promise<ComboOption[]> {
      const response = await api.get<ComboOption[]>(`${ENDPOINT}/combo`);
      return response.data;
  },

  async buscarPorId(id: string): Promise<Boletim> {
    const response = await api.get<Boletim>(`${ENDPOINT}/${id}`);
    return response.data;
  },

  async criar(dados: Boletim): Promise<Boletim> {
    const response = await api.post<Boletim>(ENDPOINT, dados);
    return response.data;
  },

  async atualizar(id: string, dados: Partial<Boletim>): Promise<Boletim> {
    const response = await api.put<Boletim>(`${ENDPOINT}/${id}`, dados);
    return response.data;
  },

  async excluir(id: string): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};
