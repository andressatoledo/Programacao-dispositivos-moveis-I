
import { api } from './api';
export const SemestreService = {
async processarSemestres() {
  const response =
    await api.post(
      "/semestre/processar-semestres",
    );

  return response.data;
}
}