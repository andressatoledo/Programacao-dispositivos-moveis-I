import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "../contexts/Theme/themeContext";
import { RootStackParamList } from "./types";

import Home from "../screens/Home/home";
import { Aluno } from "../screens/Aluno/Aluno";
import { AlunoForm } from "../screens/Aluno/AlunoForm";
import { MudarSenha } from "../screens/Auth/mudarSenha";
import { BoletimAdmin } from "../screens/BoletimAdmin/BoletimAdmin";
import { BoletimAdminForm } from "../screens/BoletimAdmin/BoletimAdminForm";
import { BoletimDisciplinaAdmin } from "../screens/BoletimAdmin/BoletimDisciplinaAdmin";
import { BoletimAluno } from "../screens/BoletimAluno/BoletimAluno";
// import { BoletimAlunoForm } from "../screens/BoletimAluno/BoletimAlunoForm";
import { Curso } from "../screens/Curso/Curso";
import { CursoForm } from "../screens/Curso/CursoForm";
import { Disciplina } from "../screens/Disciplina/Disciplina";
import { DisciplinaForm } from "../screens/Disciplina/DisciplinaForm";
import { PerfilScreen } from "../screens/Perfil";
import { Professor } from "../screens/Professor/Professor";
import { ProfessorForm } from "../screens/Professor/ProfessorForm";
import { SemestreForm } from "../screens/Semestre/SemestreForm";
import {Aviso} from "../screens/Aviso/Aviso"
import {AvisoForm} from "../screens/Aviso/AvisoForm"
const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppStack() {
  const { theme } = useTheme();

  const headerOptions = {
    headerStyle: { backgroundColor: theme.colors.surface },
    headerShadowVisible: false,
    headerTintColor: theme.colors.text,
    headerTitleStyle: { fontWeight: "bold" as const },

    // headerStatusBarHeight: 0,
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

      <Stack.Screen
        name="BoletimAluno"
        component={BoletimAluno}
        options={{ title: "Boletim", ...headerOptions }}
      />
    

      <Stack.Screen
        name="BoletimAdmin"
        component={BoletimAdmin}
        options={{ title: "Boletim", ...headerOptions }}
      />

      <Stack.Screen
        name="BoletimDisciplinaAdmin"
        component={BoletimDisciplinaAdmin}
        options={{ title: "Disciplinas", ...headerOptions }}
      />

      <Stack.Screen
        name="BoletimAdminForm"
        component={BoletimAdminForm}
        options={{ title: "Boletim", ...headerOptions }}
      />

      <Stack.Screen
        name="Disciplina"
        component={Disciplina}
        options={{ title: "Disciplinas", ...headerOptions }}
      />
      <Stack.Screen
        name="DisciplinaForm"
        component={DisciplinaForm}
        options={{ title: "Disciplinas", ...headerOptions }}
      />

      <Stack.Screen
        name="Professor"
        component={Professor}
        options={{ title: "Professores", ...headerOptions }}
      />
      <Stack.Screen
        name="ProfessorForm"
        component={ProfessorForm}
        options={{ title: "Professores", ...headerOptions }}
      />

      <Stack.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{ title: "Perfil", ...headerOptions }}
      />

      <Stack.Screen
        name="MudarSenha"
        component={MudarSenha}
        options={{ title: "Mudar Senha", ...headerOptions }}
      />

      <Stack.Screen
        name="SemestreForm"
        component={SemestreForm}
        options={{ title: "Progressão Acadêmica", ...headerOptions }}
      />

       <Stack.Screen
        name="Aviso"
        component={Aviso}
        options={{ title: "Avisos", ...headerOptions }}
      />

       <Stack.Screen
        name="AvisoForm"
        component={AvisoForm}
        options={{ title: "Aviso", ...headerOptions }}
      />
    </Stack.Navigator>
  );
}
