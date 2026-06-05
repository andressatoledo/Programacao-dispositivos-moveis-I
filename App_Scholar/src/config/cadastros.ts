import { RootStackParamList } from "@/src/navigation/types";
import { UserRole } from "@/src/types/Auth/usuario";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const cadastrosConfig = [
  {
    icon: "account-group",
    title: "Alunos",
    subtitle: "Alunos matriculados",
    routeName: "Aluno",
    roles: ["admin", "professor"] as UserRole[],
  },

  {
    icon: "file-document-edit",
    title: "Boletins",
    subtitle: "Boletins por aluno",
    routeName: "BoletimAdmin",
    roles: ["admin", "professor"] as UserRole[],
  },
   {
    icon: "file-document-edit",
    title: "Boletim",
    subtitle: "Boletim",
    routeName: "BoletimAluno",
    roles: ["aluno"] as UserRole[],
  },
  {
    icon: "school",
    title: "Cursos",
    subtitle: "Cursos disponíveis",
    routeName: "Curso",
    roles: ["admin"] as UserRole[],
  },
  {
    icon: "book-open-page-variant",
    title: "Disciplinas",
    subtitle: "Disciplinas por curso",
    routeName: "Disciplina",
    roles: ["admin"] as UserRole[],
  },
  {
    icon: "account-tie",
    title: "Professores",
    subtitle: "Professores da instituição",
    routeName: "Professor",
    roles: ["admin"] as UserRole[],
  },
] as const satisfies ReadonlyArray<{
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  title: string;
  subtitle: string;
  routeName: keyof RootStackParamList;
  roles: UserRole[];
}>;