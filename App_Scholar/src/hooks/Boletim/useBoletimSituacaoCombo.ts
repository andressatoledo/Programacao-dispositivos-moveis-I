import { useEffect, useState } from 'react';
import { ComboOption } from '../../types/Outros/ComboOption';
import { BoletimSituacaoOptions } from '../../types/boletim';


export function useBoletimSituacaoCombo() {
  const [optionsBoletimSituacao, setOptions] = useState<ComboOption[]>([]);
  const [loadingBoletimSituacao, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const mapped = Object.entries(BoletimSituacaoOptions).map(([key,value]) => ({
          value: BoletimSituacaoOptions[Number(key)].toString(),
          label: value,
        }));
    
        setOptions(mapped);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { optionsBoletimSituacao, loadingBoletimSituacao };
}