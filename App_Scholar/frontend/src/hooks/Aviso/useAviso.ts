import {
  useState,
  useCallback,
  useMemo,
} from "react";

import {
  useFocusEffect,
} from "@react-navigation/native";

import { AvisoService } from "../../services/avisoService";

import { Aviso } from "../../types/aviso";

export function useAvisos() {
  const [avisos, setAvisos] =
    useState<Aviso[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [busca, setBusca] =
    useState("");

  const carregar =
    useCallback(async () => {
      try {
        setLoading(true);

        const response =
          await AvisoService.buscarTodas();

        setAvisos(response);
      } catch (error) {
        console.error(
          "Erro ao carregar avisos:",
          error,
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar]),
  );

  const avisosFiltrados =
    useMemo(() => {
      const texto =
        busca.toLowerCase().trim();

      if (!texto) {
        return avisos;
      }

      return avisos.filter(
        (a) =>
          a.avisoTitulo
            ?.toLowerCase()
            .includes(texto) ||
          a.avisoMensagem
            ?.toLowerCase()
            .includes(texto),
      );
    }, [avisos, busca]);

  return {
    avisos: avisosFiltrados,
    loading,
    busca,
    setBusca,
    carregar,
  };
}