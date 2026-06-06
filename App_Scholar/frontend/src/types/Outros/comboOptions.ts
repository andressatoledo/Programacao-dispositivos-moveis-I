import { useAlunoCombo } from "../../hooks/Aluno/useAlunoCombo";
import { useBoletimSituacaoCombo } from "../../hooks/Boletim/useBoletimSituacaoCombo";
import { useCursoCombo } from "../../hooks/Curso/useCursoCombo";
import { useDisciplinaCombo } from "../../hooks/Disciplina/useDisciplinaCombo";
import { useProfessorCombo } from "../../hooks/Professor/useProfessorCombo";

export const comboOptions = {
  cursos: useCursoCombo,
  boletimSituacao: useBoletimSituacaoCombo,
  professores: useProfessorCombo,
  alunos: useAlunoCombo,
  disciplinas: useDisciplinaCombo,
};

export type ComboSource = keyof typeof comboOptions;
