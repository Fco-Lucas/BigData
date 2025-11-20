import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.service";
import { DashboardDataPagination, DashboardFilters } from "../types/dashboard.types";

export function useDashboardData(page: number, size: number, filters: DashboardFilters) {
  return useQuery<DashboardDataPagination>({
    queryKey: [
      "dashboard-data",
      page,
      size,
      filters.country,
      filters.start_date,
      filters.end_date,
    ],
    queryFn: () => dashboardService.getData(page, size, filters),
    enabled: Boolean(filters.start_date && filters.end_date),
    placeholderData: keepPreviousData
  });
}