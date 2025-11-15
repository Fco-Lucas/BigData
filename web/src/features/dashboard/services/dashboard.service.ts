import { api } from "@/services/http/api";
import { DashboardData, DashboardFilters } from "../types/dashboard.types";

export const dashboardService = {
  async getData(filters: DashboardFilters): Promise<DashboardData[]> {
    const { data } = await api.get("/covid/filter", { params: filters });
    return data;
  }
};