"use client"

import { ThemeModeToggle } from "@/components/theme/theme-mode-toogle";
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data";
import { DashboardFilters as DashboardFiltersInterface } from "@/features/dashboard/types/dashboard.types";
import { useRouter, useSearchParams } from "next/navigation";
import { DashboardFilters } from "./_components/dashboard-filters";
import { DashboardList } from "./_components/dashboard-list";
import { DashboardSummaryChart } from "./_components/dashboard-summary-chart";
import { DashboardContinentSummary } from "./_components/dashboard-continent-summary";
import { DashboardContinentVaccinations } from "./_components/dashboard-continent-vaccinations";
import { DashboardListPagination } from "./_components/dashboard-list-pagination";
import type { DashboardFilterSchema } from "@/features/dashboard/schemas/dashboard-filter.schema";
import { useDashboardSummary } from "@/features/dashboard/hooks/use-dashboard-summary";

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const size = Number(searchParams.get("size") ?? 20);
  const country = searchParams.get("country") ?? "";
  const start_date = searchParams.get("start_date") ?? "";
  const end_date = searchParams.get("end_date") ?? "";

  const filters: DashboardFiltersInterface = { country, start_date, end_date };
  const { data: records, isLoading: isLoadingRecords, isError: isErrorRecords } = useDashboardData(page, size, filters);
  const { data: summary, isLoading: isLoadingSummary, isError: isErrorSummary } = useDashboardSummary();

  function setFilters (data: DashboardFilterSchema) {
    const params = new URLSearchParams(searchParams.toString());
    data.country ? params.set("country", data.country) : params.delete("country");
    data.start_date ? params.set("start_date", data.start_date) : params.delete("start_date");
    data.end_date ? params.set("end_date", data.end_date) : params.delete("end_date");
    params.set("page", "1"); // reseta a paginação quando troca filtros

    router.push(`?${params.toString()}`, { scroll: false });
  }

  function setSize(newSize: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("size", String(newSize));
    params.set("page", "1"); // reseta a paginação quando troca tamanho
    router.push(`?${params.toString()}`, { scroll: false });
  }

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`, { scroll: false });
  }

  function firstPage() {
    if (!records) return;
    goToPage(1);
  }

  function previousPage() {
    if (!records) return;
    if (page - 1 <= 0) return;
    goToPage(page - 1);
  }

  function nextPage() {
    if (!records) return;
    if (page + 1 > records.pages) return;
    goToPage(page + 1);
  }

  function lastPage() {
    if (!records) return;
    goToPage(records.pages);
  }

  return (
    <main className="px-15 py-6">
      <div className="flex justify-between items-center gap-3 mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <h2 className="text-sm">Dados sobre COVID-19</h2>
        </div>
        <ThemeModeToggle />
      </div>

      <h2 className="text-1xl font-bold mb-2">Informações gerais:</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="col-span-1">
          <DashboardSummaryChart data={summary} isLoading={isLoadingSummary} isError={isErrorSummary} />
        </div>
        <div className="col-span-1">
          <DashboardContinentSummary />
        </div>
        <div className="col-span-2 md:col-span-1">
          <DashboardContinentVaccinations />
        </div>
      </div>

      <div className="flex justify-between items-center gap-3 mb-2">
        <h2 className="text-1xl font-bold">Informações específicas:</h2>
        <DashboardFilters onFiltersChange={setFilters} />
      </div>

      <DashboardList data={records} isLoading={isLoadingRecords} isError={isErrorRecords} />
      
      {records && records.pages > 1 && (
        <DashboardListPagination 
          page={page}
          pages={records.pages}
          total={records.total}
          showCount={records.data.length}
          onFirst={firstPage}
          onPrevious={previousPage}
          onNext={nextPage}
          onLast={lastPage}
          onSizeChange={setSize}
        />
      )}
    </main>
  );
}
