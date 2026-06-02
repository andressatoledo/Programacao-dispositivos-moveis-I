
import { api } from './api';
import {type ProfessorFiltro, Professor} from '../types/professor';
import { ComboOption } from '../types/Outros/combo';

const ENDPOINT = '/professores';

export const ProfessorService = {
  async buscarTodas(filtro?: ProfessorFiltro): Promise<Professor[]> {
    const response = await api.get<Professor[]>(ENDPOINT, { params: filtro});
    return response.data;
  },

  async buscarCombo(): Promise<ComboOption[]> {
      const response = await api.get<ComboOption[]>(`${ENDPOINT}/combo`);
      return response.data;
  },

  async buscarPorId(id: string): Promise<Professor> {
    const response = await api.get<Professor>(`${ENDPOINT}/${id}`);
    return response.data;
  },

  async criar(dados: Professor): Promise<Professor> {
    const response = await api.post<Professor>(ENDPOINT, dados);
    return response.data;
  },

  async atualizar(id: string, dados: Partial<Professor>): Promise<Professor> {
    const response = await api.put<Professor>(`${ENDPOINT}/${id}`, dados);
    return response.data;
  },

  async excluir(id: string): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};
