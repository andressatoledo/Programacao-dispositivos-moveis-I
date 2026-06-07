import React, { useState } from "react";

import {
  Alert,
  View,
  Text,
} from "react-native";

import { Button } from "../../components/Form/Button";

import { SemestreService } from "../../services/semestreService";
import { Form } from "@/src/components/Form/Form";

export function SemestreForm() {
  const [loading, setLoading] =
    useState(false);

  async function processar() {
    try {
      setLoading(true);

      const resultado =
        await SemestreService.processarSemestres();

      Alert.alert(
        "Sucesso",
        `${resultado.atualizados} alunos atualizados.`,
      );
    } catch {
      Alert.alert(
        "Erro",
        "Não foi possível processar os semestres.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form>
    
      <Text
        style={{
          marginBottom: 10,
          color: "#FFFFFF",
        }}
      >
        Esta rotina irá avançar os
        alunos para o próximo
        semestre.
      </Text>

      <Button
        label="Processar semestre"
        onPress={processar}
      />
    </Form>
  );
}