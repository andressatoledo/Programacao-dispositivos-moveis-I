import { useEffect, useState } from 'react';
import { ProfessorService } from '../../services/professorService';

interface ComboOption {
  label: string;
  value: string;
}

// Mock temporário seguindo a interface ideal
const PROFESSORES_MOCK: ComboOption[] = [
  { label: 'Dr. Roberto Chaves', value: '1' },
  { label: 'Me. Eliane Souza', value: '2' },
  { label: 'Dra. Amanda Costa', value: '3' },
  { label: 'Prof. Ricardo Mendes', value: '4' },
];

export function useProfessorCombo() {
  const [optionsProfessores, setOptions] = useState<ComboOption[]>([]);
  const [loadingProfessores, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // Tentativa de buscar da API (ProfessorService)
        const data = await ProfessorService.buscarCombo();

        const mapped = data.map((c) => ({
          value: c.value,
          label: c.label,
        }));

        setOptions(mapped);
      } catch (error) {
        console.warn("Usando mock para Professores (Serviço indisponível)");
        // Fallback para o mock caso a API falhe ou não exista
        setOptions(PROFESSORES_MOCK);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // Retornando conforme o seu padrão
  return { 
    optionsProfessores, 
    loadingProfessores 
  };
}