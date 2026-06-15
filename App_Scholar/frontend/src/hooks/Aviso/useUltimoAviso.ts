import {
  useState,
  useCallback,
  useEffect,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { AvisoService } from "../../services/avisoService";

import { Aviso } from "../../types/aviso";

const STORAGE_KEY =
  "@avisos_visualizados";

export function useUltimoAviso() {
  const [aviso, setAviso] =
    useState<Aviso | null>(null);

  const [loading, setLoading] =
    useState(false);

  const carregar =
    useCallback(async () => {
      try {
        setLoading(true);

        const avisos =
          await AvisoService.buscarTodas();

        const visualizados =
          await AsyncStorage.getItem(
            STORAGE_KEY,
          );

        const idsVisualizados =
          visualizados
            ? JSON.parse(
                visualizados,
              )
            : [];

        const naoVisualizados =
          avisos.filter(
            (a) =>
              !idsVisualizados.includes(
                a.avisoId,
              ),
          );

        setAviso(
          naoVisualizados[0] ??
            null,
        );
      } catch (error) {
        console.error(
          "Erro ao carregar aviso:",
          error,
        );
      } finally {
        setLoading(false);
      }
    }, []);

  const marcarComoVisualizado =
    useCallback(
      async (
        avisoId: string,
      ) => {
        const visualizados =
          await AsyncStorage.getItem(
            STORAGE_KEY,
          );

        const ids =
          visualizados
            ? JSON.parse(
                visualizados,
              )
            : [];

        if (
          !ids.includes(avisoId)
        ) {
          ids.push(avisoId);

          await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(ids),
          );
        }

        setAviso(null);
      },
      [],
    );

  useEffect(() => {
    carregar();
  }, [carregar]);

  return {
    aviso,
    loading,
    carregar,
    marcarComoVisualizado,
  };
}