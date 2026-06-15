import { api } from "./api";

import {
  Aviso,
  AvisoFiltro,
  AvisoNaoLidoResponse,
  AvisoContadorResponse,
} from "../types/aviso";

import { ComboOption } from "../types/Outros/combo";

const ENDPOINT = "/avisos";

export const AvisoService = {
  async buscarTodas(
    filtro?: AvisoFiltro,
  ): Promise<Aviso[]> {
    const response =
      await api.get<Aviso[]>(
        ENDPOINT,
        {
          params: filtro,
        },
      );

    return response.data;
  },

  async buscarPorId(
    id: string,
  ): Promise<Aviso> {
    const response =
      await api.get<Aviso>(
        `${ENDPOINT}/${id}`,
      );

    return response.data;
  },

  async criar(
    dados: Aviso,
  ): Promise<Aviso> {
    const response =
      await api.post<Aviso>(
        ENDPOINT,
        dados,
      );

    return response.data;
  },

  async atualizar(
    id: string,
    dados: Partial<Aviso>,
  ): Promise<Aviso> {
    const response =
      await api.put<Aviso>(
        `${ENDPOINT}/${id}`,
        dados,
      );

    return response.data;
  },

  async excluir(
    id: string,
  ): Promise<void> {
    await api.delete(
      `${ENDPOINT}/${id}`,
    );
  },

  async buscarNaoLidos(): Promise<
    AvisoNaoLidoResponse[]
  > {
    const response =
      await api.get<
        AvisoNaoLidoResponse[]
      >(`${ENDPOINT}/nao-lidos`);

    return response.data;
  },

  async buscarQuantidadeNaoLidos(): Promise<AvisoContadorResponse> {
    const response =
      await api.get<AvisoContadorResponse>(
        `${ENDPOINT}/contador`,
      );

    return response.data;
  },

  async marcarComoLido(
    avisoId: string,
  ): Promise<void> {
    await api.post(
      `${ENDPOINT}/${avisoId}/lido`,
    );
  },

  async buscarComboCursos(): Promise<
    ComboOption[]
  > {
    const response =
      await api.get<
        ComboOption[]
      >(
        `${ENDPOINT}/combo/cursos`,
      );

    return response.data;
  },
};