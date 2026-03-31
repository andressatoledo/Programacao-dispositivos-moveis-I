import { Mode } from '../types/Outros/mode';

export type RootStackParamList = {
  Tabs: undefined;

  Curso: {};

  CursoForm: {
    mode: Mode;
    cursoId?: string;
    navigation?: undefined;
  };

  Aluno: {};

  AlunoForm: {
    mode: Mode;
    alunoId?: string;
    navigation?: undefined;
  };

  Professor: {};

  ProfessorForm: {
    mode: Mode;
    professorId?: string;
    navigation?: undefined;
  };

  Disciplina: {};

  DisciplinaForm: {
    mode: Mode;
    disciplinaId?: string;
    navigation?: undefined;
  };

  Boletim: {};

  BoletimForm: {
    mode: Mode;
    boletimId?: string;
    navigation?: undefined;
  };

  Empregadora: {};

  EmpregadoraForm: {
    mode: Mode;
    empregadoraId?: string;
    navigation?: undefined;
  };

  Manutencao: {};

  ManutencaoForm: {
    mode: Mode;
    manutencaoId?: string;
    navigation?: undefined;
  };
};
