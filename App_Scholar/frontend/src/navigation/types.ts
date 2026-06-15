import { Mode } from '../types/Outros/mode';

export type RootStackParamList = {
  Home: undefined;
  Tabs: undefined;

  Curso: undefined;

  CursoForm: {
    mode: Mode;
    cursoId?: string;
    navigation?: undefined;
  };

  Aluno: undefined;

  AlunoForm: {
    mode: Mode;
    alunoId?: string;
    navigation?: undefined;
  };

  Professor: undefined;

  ProfessorForm: {
    mode: Mode;
    professorId?: string;
    navigation?: undefined;
  };

  Disciplina: undefined;

  DisciplinaForm: {
    mode: Mode;
    disciplinaId?: string;
    navigation?: undefined;
  };

  BoletimAluno: undefined;

  BoletimAlunoForm: {
    mode: Mode;
    alunoId?: string;
    navigation?: undefined;
  };

  BoletimAdmin: undefined;

 BoletimAdminForm: {
  mode: Mode;
  boletimId?: string;
  alunoId?: string;
  disciplinaId?: string;
  disciplinaNome?: string;
};

  BoletimDisciplinaAdmin: {
    mode: Mode;
    alunoId?: string;
    navigation?: undefined;
  };

  Perfil: {
    navigation?: undefined;
  };
  MudarSenha: undefined;

  SemestreForm: undefined;

  Aviso: undefined;

  AvisoForm: {mode: Mode, avisoId?:string};
};
