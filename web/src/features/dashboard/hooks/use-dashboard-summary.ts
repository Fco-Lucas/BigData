import { useQuery } from "@tanstack/react-query";
import { DashboardSummary } from "../types/dashboard.types";
import { dashboardService } from "../services/dashboard.service";

export function useDashboardSummary() {
  return useQuery<DashboardSummary[]>({
    queryKey: ["dashboard-summary"],
    queryFn: () => dashboardService.getSummary(), 
  });
}