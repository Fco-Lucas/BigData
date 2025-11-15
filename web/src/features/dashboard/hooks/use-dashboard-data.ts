import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.service";
import { DashboardData, DashboardFilters } from "../types/dashboard.types";

export function useDashboardData(filters: DashboardFilters) {
  return useQuery<DashboardData[]>({
    queryKey: [
      "dashboard-data",
      filters.country,
      filters.start_date,
      filters.end_date,
    ],
    queryFn: () => dashboardService.getData(filters),
    enabled: Boolean(filters.start_date && filters.end_date),
  });
}