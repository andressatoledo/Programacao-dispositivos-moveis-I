import { api } from './api';
import { ComboOption } from '../types/Outros/combo';

const ENDPOINT = '/cursos';

export const CursoService = {

  async buscarCombo(): Promise<ComboOption[]> {
    const response = await api.get<ComboOption[]>(`${ENDPOINT}/combo`);
    return response.data;
  },

};
