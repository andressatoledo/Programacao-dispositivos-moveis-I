import { useCursoCombo } from '../../../src/hooks/Curso/useCursoCombo';
import { useBoletimSituacaoCombo } from '../../../src/hooks/Boletim/useBoletimSituacaoCombo';
import { useProfessorCombo } from '@/src/hooks/Professor/useProfessorCombo';

export const comboOptions = {
  cursos: useCursoCombo,
  boletimSituacao: useBoletimSituacaoCombo,
  professores: useProfessorCombo
};

export type ComboSource = keyof typeof comboOptions;