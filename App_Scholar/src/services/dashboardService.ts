// src/services/DashboardService.ts

import {api} from "./api";

export class DashboardService {
  static async resumo() {
    const response = await api.get("/dashboard/resumo");

    return response.data;
  }
}