"use client"

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import { ChevronDownIcon, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { dashboardFilterSchema, DashboardFilterSchema } from "@/features/dashboard/schemas/dashboard-filter.schema";
import { useSearchParams } from "next/navigation";

interface DashboardFiltersProps {
  onFiltersChange: (data: DashboardFilterSchema) => void;
}

export function DashboardFilters({ onFiltersChange }: DashboardFiltersProps) {
  const searchParams = useSearchParams();
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);

  const country = searchParams.get("country") ?? "";
  const start_date = searchParams.get("start_date") ?? "";
  const end_date = searchParams.get("end_date") ?? "";

  const { register, handleSubmit, control } = useForm<DashboardFilterSchema>({
    resolver: zodResolver(dashboardFilterSchema),
    values: { country, start_date, end_date }
  });

  function handleFilters(data: DashboardFilterSchema) {
    onFiltersChange(data);
  }

  return (
    <form onSubmit={handleSubmit(handleFilters)} className="flex items-center mb-3 gap-2">
      <Input type="text" className="w-auto" autoComplete="off" placeholder="País" {...register('country')} />
      
      <Controller
        control={control}
        name="start_date"
        render={({ field }) => (
          <Popover open={isStartDateOpen} onOpenChange={setIsStartDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-between text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value ? format(new Date(field.value + "T00:00:00"), "dd/MM/yyyy") : <span>Data inicial</span>}
                <ChevronDownIcon className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value + "T00:00:00") : undefined}
                captionLayout="dropdown"
                onSelect={(date) => {
                  field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                  setIsStartDateOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        )}
      />

      <Controller
        control={control}
        name="end_date"
        render={({ field }) => (
          <Popover open={isEndDateOpen} onOpenChange={setIsEndDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-between text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value ? format(new Date(field.value + "T00:00:00"), "dd/MM/yyyy") : <span>Data final</span>}
                <ChevronDownIcon className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value + "T00:00:00") : undefined}
                captionLayout="dropdown"
                onSelect={(date) => {
                  field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                  setIsEndDateOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        )}
      />

      <Button type="submit" variant={"link"}>
        <Search className="m-4 h-4 mr-2" />
        Filtrar resultados
      </Button>
    </form>
  )
}
