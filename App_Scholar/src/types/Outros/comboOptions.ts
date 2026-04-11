import { useCursoCombo } from '../../../src/hooks/Curso/useCursoCombo';
import { useBoletimSituacaoCombo } from '../../../src/hooks/Boletim/useBoletimSituacaoCombo';
import { useProfessorCombo } from '../../../src/hooks/Professor/useProfessorCombo';
import { useDisciplinaCombo } from '../../../src/hooks/Disciplina/useDisciplinaCombo';
import { useAlunoCombo } from '../../../src/hooks/Aluno/useAlunoCombo';

export const comboOptions = {
  cursos: useCursoCombo,
  boletimSituacao: useBoletimSituacaoCombo,
  professores: useProfessorCombo,
  alunos: useAlunoCombo,
  disciplinas: useDisciplinaCombo,
};

export type ComboSource = keyof typeof comboOptions;