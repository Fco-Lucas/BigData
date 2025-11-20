import { useQuery } from "@tanstack/react-query";
import type { DashboardContinentSummary } from "../types/dashboard.types";
import { dashboardService } from "../services/dashboard.service";

export function useDashboardContinentSummary() {
  return useQuery<DashboardContinentSummary[]>({
    queryKey: ["dashboard-continent-summary"],
    queryFn: () => dashboardService.getContinentSummary(), 
  });
}