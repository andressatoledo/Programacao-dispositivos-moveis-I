import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "react-native";

import { Button } from "../../components/Form/Button";
import { Form } from "../../components/Form/Form";

import { useMensagem } from "../../hooks/Outros/useMensagem";

import { TypeMessage } from "../../types/Outros/messageType";

import { getErrorMessage } from "../../utils/getErrorMessage";
import { navigateWithDelay } from "../../utils/navigateWithDelay";

import { RootStackParamList } from "../../navigation/types";

import { SemestreService } from "../../services/semestreService";

type Props = NativeStackScreenProps<RootStackParamList, "SemestreForm">;

export function SemestreForm({ navigation }: Props) {
  const showMessage = useMensagem();

  async function handleProcessar() {
    try {
      const resultado = await SemestreService.processarSemestres();

      showMessage(
        `${resultado.atualizados} alunos foram avançados para o próximo semestre.`,
        TypeMessage.success,
      );

      await navigateWithDelay(() => navigation.goBack());
    } catch (error) {
      showMessage(getErrorMessage(error), TypeMessage.error);
    }
  }

  return (
    <Form>
      <Text
        style={{
          fontSize: 16,
          lineHeight: 24,
          marginBottom: 20,
          color: "#FFFFFF",
        }}
      >
        Esta rotina irá atualizar o semestre atual dos alunos aptos para
        progressão acadêmica.
      </Text>

      <Button label="Processar semestre" onPress={handleProcessar} />
    </Form>
  );
}
