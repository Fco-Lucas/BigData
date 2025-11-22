"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartConfig, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { DashboardSummary } from "@/features/dashboard/types/dashboard.types";
import { formatNumber } from "@/utils/formaters";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { DashboardSummaryChartSkeleton } from "./dashboard-skeletons";

const chartConfig = {
  total_cases: {
    label: "Casos Totais:",
    color: "#2563eb",
  },
} satisfies ChartConfig

interface DashboardSummaryChartProps {
  data?: DashboardSummary[],
  isLoading: boolean,
  isError: boolean,
} 

export function DashboardSummaryChart({ data, isLoading, isError }: DashboardSummaryChartProps) {
  if (isLoading) return <DashboardSummaryChartSkeleton />;
  if (isError || !data) return <p className="p-4 text-red-500">Erro ao carregar os dados.</p>;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Top 10 Países — Casos Acumulados</CardTitle>
        <CardDescription>Janeiro 2020 - Setembro 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
          <BarChart
            layout="vertical"
            data={data}
          >
            <YAxis
              dataKey="country"
              type="category"
              tickLine={false}
              axisLine={false}
            />
            
            <XAxis
              type="number"
              tickFormatter={(value) => formatNumber(value)}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar
              dataKey="total_cases"
              fill="#3F56E8"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
} 