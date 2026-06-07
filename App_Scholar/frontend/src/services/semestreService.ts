
import { api } from './api';
export const SemestreService = {
async processarSemestres() {
  const response =
    await api.post(
      "/semestres/processar-semestres",
    );

  return response.data;
}
}