import { useEffect, useState } from 'react';
import { DisciplinaService } from '../../services/disciplinaService';

interface ComboOption {
  label: string;
  value: string;
}


const CURSOS_MOCK: ComboOption[] = [
  { label: 'Engenharia de software', value: '1' },
  { label: 'Programação', value: '2' },
  { label: 'Experiência do Usuário', value: '3' },
];

export function useDisciplinaCombo() {
  const [optionsDisciplinas, setOptions] = useState<ComboOption[]>([]);
  const [loadingDisciplinas, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // Tentativa de buscar da API
        const data = await DisciplinaService.buscarCombo();

        const mapped = data.map((c) => ({
          value: c.value,
          label: c.label,
        }));

        setOptions(mapped);
      } catch (error) {
        console.warn("Usando dados de mock (Falha na API ou ambiente local)", error);
        // Em caso de erro (ou enquanto a API não existe), injetamos o mock
        setOptions(CURSOS_MOCK);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { optionsDisciplinas, loadingDisciplinas };
}