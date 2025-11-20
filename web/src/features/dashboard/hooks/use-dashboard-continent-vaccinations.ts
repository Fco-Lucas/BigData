import type { DashboardContinentVaccinations } from "../types/dashboard.types";
import { dashboardService } from "../services/dashboard.service";
import { useQuery } from "@tanstack/react-query";

export function useDashboardContinentVaccinations() {
  return useQuery<DashboardContinentVaccinations[]>({
    queryKey: ["dashboard-continent-vaccinations"],
    queryFn: () => dashboardService.getContinentVaccinations()
  });
}