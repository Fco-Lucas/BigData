"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import { dashboardFilterSchema, DashboardFilterSchema } from "@/features/dashboard/schemas/dashboard-filter.schema";
import { useRouter, useSearchParams } from "next/navigation";

export function DashboardFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const country = searchParams.get("country") ?? "";
  const start_date = searchParams.get("start_date") ?? "";
  const end_date = searchParams.get("end_date") ?? "";

  const { register, handleSubmit } = useForm<DashboardFilterSchema>({
    resolver: zodResolver(dashboardFilterSchema),
    values: { country, start_date, end_date }
  });

  function handleFilters(data: DashboardFilterSchema) {
    const params = new URLSearchParams();
    data.country ? params.set("country", data.country) : params.delete("country");
    data.start_date ? params.set("start_date", data.start_date) : params.delete("start_date");
    data.end_date ? params.set("end_date", data.end_date) : params.delete("end_date");

    router.push(`?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit(handleFilters)} className="flex items-center mb-3 gap-2">
      <Input type="text" className="w-auto" placeholder="País" {...register('country')} />
      <Input type="date" className="w-auto" placeholder="Data inicial" {...register('start_date')} />
      <Input type="date" className="w-auto" placeholder="Data final" {...register('end_date')} />
      <Button type="submit" variant={"link"}>
        <Search className="m-4 h-4 mr-2" />
        Filtar resultados
      </Button>
    </form>
  )
}