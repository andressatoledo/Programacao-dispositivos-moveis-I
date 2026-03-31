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
        const data = await CursoService.buscarCombo();

        const mapped = data.map((c) => ({
          value: c.value,
          label: c.label,
        }));

        setOptions(mapped);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { optionsCursos, loadingCursos: loadingCursos };
}
