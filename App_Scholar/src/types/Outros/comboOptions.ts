import { useCursoCombo } from '../../../src/hooks/Curso/useCursoCombo';

export const comboOptions = {
  cursos: useCursoCombo,
  
};

export type ComboSource = keyof typeof comboOptions;