"use client"

import { Pie, PieChart, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

import { useDashboardContinentSummary } from "@/features/dashboard/hooks/use-dashboard-continent-summary"

const blues = ["#bfdbfe", "#93c5fd", "#60a5fa", "#3b82f6", "#1d4ed8"];

export function DashboardContinentSummary() {
  const { data, isLoading, isError } = useDashboardContinentSummary()

  if (isLoading) return <p>Carregando...</p>
  if (isError || !data) return <p>Erro ao carregar dados</p>

  // 🔹 Define cores com base no índice usando variáveis do shadcn
  const chartConfig: ChartConfig = data.reduce((acc, item, index) => {
    acc[item.continent] = {
      label: item.continent,
    }
    return acc
  }, {} as ChartConfig)

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Casos Acumulados por Continente</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />

            <Pie
              data={data}
              dataKey="new_cases"
              nameKey="continent"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.continent}
                  fill={blues[index % blues.length]}
                />
              ))}
            </Pie>

            <ChartLegend
              content={<ChartLegendContent nameKey="continent" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />

          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
