import { api } from "@/services/http/api";
import { DashboardFilters, DashboardContinentSummary, DashboardContinentVaccinations, DashboardSummary, DashboardDataPagination } from "../types/dashboard.types";

export const dashboardService = {
  async getData(page: number, size: number, filters: DashboardFilters): Promise<DashboardDataPagination> {
    const { data } = await api.get("/covid/filter", { params: { ...filters, page, size } });
    return data;
  },

  async getSummary(): Promise<DashboardSummary[]> {
    const { data } = await api.get("/covid/summary");
    return data;
  },

  async getContinentSummary(): Promise<DashboardContinentSummary[]> {
    const { data } = await api.get("/covid/continent-summary");
    return data;
  },

  async getContinentVaccinations(): Promise<DashboardContinentVaccinations[]> {
    const { data } = await api.get("/covid/continent-vaccinations");
    return data;
  }
};