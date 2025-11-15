"use client"

import { ThemeModeToggle } from "@/components/theme/theme-mode-toogle";
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data";
import { DashboardFilters as DashboardFiltersInterface } from "@/features/dashboard/types/dashboard.types";
import { useSearchParams } from "next/navigation";
import { DashboardFilters } from "./_components/dashboard-filters";
import { DashboardList } from "./_components/dashboard-list";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const country = searchParams.get("country") ?? "";
  const start_date = searchParams.get("start_date") ?? "";
  const end_date = searchParams.get("end_date") ?? "";

  const filters: DashboardFiltersInterface = { country, start_date, end_date };

  const { data, isLoading, isError } = useDashboardData(filters);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <ThemeModeToggle />
      <h1 className="text-3xl font-bold mb-3">Dashboard</h1>

      <DashboardFilters />
      <DashboardList data={data} isLoading={isLoading} isError={isError} />
    </main>
  );
}
