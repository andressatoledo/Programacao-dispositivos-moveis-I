import React from "react";

import {
  View,
} from "react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  Carteira,
} from "../../components/Form/Carteira";

import {
  CarteiraHeader,
} from "../../components/Form/CarteiraHeader";

import {
  CarteiraItem,
} from "../../components/Form/CarteiraItem";

import {
  EmptyCarteira,
} from "../../components/Feedback/EmptyCarteira";

import {
  useAvisos,
} from "../../hooks/Aviso/useAviso";

import { useAuth } from "../../hooks/Auth/useAuth";

export function Aviso() {
  const navigation =
    useNavigation<any>();

  const {
    user,
  } = useAuth();

  const {
    avisos,
    busca,
    setBusca,
  } = useAvisos();

  const podeCriar =
    user?.role === "admin" ||
    user?.role === "professor";

  return (
    <View style={{ flex: 1 }}>
      <Carteira title="Avisos">
        <CarteiraHeader
          placeholder="Buscar aviso..."
          searchValue={busca}
          onSearchChange={setBusca}
          hideFilter
          hideAdd={!podeCriar}
          onAddPress={() =>
            navigation.navigate(
              "AvisoForm",
              {
                mode: "create",
              },
            )
          }
        />

        {avisos.length === 0 ? (
          <EmptyCarteira />
        ) : (
          avisos.map(
            (item) => (
              <CarteiraItem
                key={
                  item.avisoId
                }
                icon="bullhorn"

                title={
                  item.avisoTitulo
                }

                description={
                  item.avisoMensagem
                }

                onPress={() =>
                  navigation.navigate(
                    "AvisoForm",
                    {
                      mode: "view",
                      avisoId:
                        item.avisoId,
                    },
                  )
                }
              />
            ),
          )
        )}
      </Carteira>
    </View>
  );
}