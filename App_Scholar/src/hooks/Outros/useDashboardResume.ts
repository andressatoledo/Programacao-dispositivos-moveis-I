import { useEffect, useState } from "react";
import { DashboardService } from "../../services/dashboardService";

export function useDashboardResumo() {
  const [resumo, setResumo] = useState<Record<string, number>>({});

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const data = await DashboardService.resumo();

    setResumo(data);
  }

  return resumo;
}