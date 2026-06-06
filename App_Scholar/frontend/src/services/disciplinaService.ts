
import { api } from './api';
import {type DisciplinaFiltro, Disciplina} from '../types/disciplina';
import { ComboOption } from '../types/Outros/combo';

const ENDPOINT = '/disciplinas';

export const DisciplinaService = {
  async buscarTodas(filtro?: DisciplinaFiltro): Promise<Disciplina[]> {
    const response = await api.get<Disciplina[]>(ENDPOINT, { params: filtro});
    return response.data;
  },

  async buscarCombo(): Promise<ComboOption[]> {
      const response = await api.get<ComboOption[]>(`${ENDPOINT}/combo`);
      return response.data;
  },

  async buscarPorId(id: string): Promise<Disciplina> {
    const response = await api.get<Disciplina>(`${ENDPOINT}/${id}`);
    return response.data;
  },

  async criar(dados: Disciplina): Promise<Disciplina> {
    const response = await api.post<Disciplina>(ENDPOINT, dados);
    return response.data;
  },

  async atualizar(id: string, dados: Partial<Disciplina>): Promise<Disciplina> {
    console.log("Atualizando disciplina com ID:", id, "e dados:", dados);
    const response = await api.put<Disciplina>(`${ENDPOINT}/${id}`, dados);
    return response.data;
  },

  async excluir(id: string): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};
