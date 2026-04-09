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

  Boletim: undefined;

  BoletimForm: {
    mode: Mode;
    boletimId?: string;
    navigation?: undefined;
  };

  Empregadora: undefined;

  EmpregadoraForm: {
    mode: Mode;
    empregadoraId?: string;
    navigation?: undefined;
  };

  Manutencao: undefined;

  ManutencaoForm: {
    mode: Mode;
    manutencaoId?: string;
    navigation?: undefined;
  };
};
