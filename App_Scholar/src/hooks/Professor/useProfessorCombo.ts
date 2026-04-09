import { useEffect, useState } from 'react';
import { ProfessorService } from '../../services/professorService';

interface ComboOption {
  label: string;
  value: string;
}

export function useProfessorCombo() {
  const [optionsProfessors, setOptions] = useState<ComboOption[]>([]);
  const [loadingProfessors, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await ProfessorService.buscarCombo();

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

  return { optionsProfessors, loadingProfessors: loadingProfessors };
}
