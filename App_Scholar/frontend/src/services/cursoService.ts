
import { api } from './api';
import {type CursoFiltro, Curso} from '../types/curso';
import { ComboOption } from '../types/Outros/combo';

const ENDPOINT = '/cursos';

export const CursoService = {
  async buscarTodas(filtro?: CursoFiltro): Promise<Curso[]> {
    const response = await api.get<Curso[]>(ENDPOINT, { params: filtro});
    return response.data;
  },

  async buscarCombo(): Promise<ComboOption[]> {
      const response = await api.get<ComboOption[]>(`${ENDPOINT}/combo`);
      return response.data;
  },

  async buscarPorId(id: string): Promise<Curso> {
    const response = await api.get<Curso>(`${ENDPOINT}/${id}`);
    return response.data;
  },

  async criar(dados: Curso): Promise<Curso> {
    const response = await api.post<Curso>(ENDPOINT, dados);
    return response.data;
  },

  async atualizar(id: string, dados: Partial<Curso>): Promise<Curso> {
    const response = await api.put<Curso>(`${ENDPOINT}/${id}`, dados);
    return response.data;
  },

  async excluir(id: string): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};
