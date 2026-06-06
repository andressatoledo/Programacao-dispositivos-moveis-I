
import { api } from './api';
import {type AlunoFiltro, Aluno} from '../types/aluno';
import { ComboOption } from '../types/Outros/combo';

const ENDPOINT = '/alunos';

export const AlunoService = {
  async buscarTodas(filtro?: AlunoFiltro): Promise<Aluno[]> {
    const response = await api.get<Aluno[]>(ENDPOINT, { params: filtro});
    return response.data;
  },

  async buscarCombo(): Promise<ComboOption[]> {
      const response = await api.get<ComboOption[]>(`${ENDPOINT}/combo`);
      return response.data;
  },

  async buscarPorId(id: string): Promise<Aluno> {
    const response = await api.get<Aluno>(`${ENDPOINT}/${id}`);
    return response.data;
  },

  async criar(dados: Aluno): Promise<Aluno> {
    const response = await api.post<Aluno>(ENDPOINT, dados);
    return response.data;
  },

  async atualizar(id: string, dados: Partial<Aluno>): Promise<Aluno> {
    const response = await api.put<Aluno>(`${ENDPOINT}/${id}`, dados);
    return response.data;
  },

  async excluir(id: string): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};
