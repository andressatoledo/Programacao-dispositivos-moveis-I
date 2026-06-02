import { useEffect, useState } from 'react';
import { CursoService } from '../../services/cursoService';

interface ComboOption {
  label: string;
  value: string;
}


export function useCursoCombo() {
  const [optionsCursos, setOptions] = useState<ComboOption[]>([]);
  const [loadingCursos, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // Tentativa de buscar da API
        const data = await CursoService.buscarCombo();

        const mapped = data.map((c) => ({
          value: c.value,
          label: c.label,
        }));

        setOptions(mapped);
      } catch (error) {
        console.warn("Usando dados de mock (Falha na API ou ambiente local)", error);
       
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { optionsCursos, loadingCursos };
}