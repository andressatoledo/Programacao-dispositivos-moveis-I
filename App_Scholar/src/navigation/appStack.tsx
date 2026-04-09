import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useTheme } from "../../src/contexts/Theme/themeContext";
import { RootStackParamList } from "./types";

// Imports (Ajuste os caminhos conforme o seu projeto)
import Home from "@/src/screens/Home/home";
import { Aluno } from "../screens/Aluno/Aluno";
import { AlunoForm } from "../screens/Aluno/AlunoForm";
import { Curso } from "../screens/Cadastros/Curso";
import { CursoForm } from "../screens/Cadastros/Curso/CursoForm";
// Adicione os imports faltantes:
// import { Boletim } from '../screens/Boletim';
// import { BoletimForm } from '../screens/Boletim/BoletimForm';
// import { Disciplina } from '../screens/Disciplina';
// import { DisciplinaForm } from '../screens/Disciplina/DisciplinaForm';
// import { Professor } from '../screens/Professor';
// import { ProfessorForm } from '../screens/Professor/ProfessorForm';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppStack() {
  const { theme } = useTheme();

  const headerOptions = {
    headerStyle: {backgroundColor: theme.colors.surface},
    headerShadowVisible: false,
    headerTintColor: theme.colors.text,
    headerTitleStyle: { fontWeight: "bold" as const },
    
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Aluno"
        component={Aluno}
        options={{ title: "Alunos", ...headerOptions }}
      />
      <Stack.Screen
        name="AlunoForm"
        component={AlunoForm}
        options={{ title: "Alunos", ...headerOptions }}
      />

      <Stack.Screen
        name="Curso"
        component={Curso}
        options={{ title: "Cursos", ...headerOptions }}
      />
      <Stack.Screen
        name="CursoForm"
        component={CursoForm}
        options={{ title: "Cursos", ...headerOptions }}
      />

      {/* <Stack.Screen
        name="Boletim"
        component={Boletim}
        options={{ title: 'Boletim', ...headerOptions }}
      /> 
      <Stack.Screen
        name="BoletimForm"
        component={BoletimForm}
        options={{ title: 'Boletim', ...headerOptions }}
      />

      
      <Stack.Screen
        name="Disciplina"
        component={Disciplina}
        options={{ title: 'Disciplinas', ...headerOptions }}
      />
      <Stack.Screen
        name="DisciplinaForm"
        component={DisciplinaForm}
        options={{ title: 'Disciplinas', ...headerOptions }}
      />

      <Stack.Screen
        name="Professor"
        component={Professor}
        options={{ title: 'Professores', ...headerOptions }}
      />
      <Stack.Screen
        name="ProfessorForm"
        component={ProfessorForm}
        options={{ title: 'Professores', ...headerOptions }}
      />*/}
    </Stack.Navigator>
  );
}
