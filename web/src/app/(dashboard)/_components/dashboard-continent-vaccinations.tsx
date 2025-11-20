"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Rectangle, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from "@/components/ui/chart"
import { useDashboardContinentVaccinations } from "@/features/dashboard/hooks/use-dashboard-continent-vaccinations"
import { formatNumber } from "@/utils/formaters"

export function DashboardContinentVaccinations() {
  const { data, isLoading, isError } = useDashboardContinentVaccinations()

  if (isLoading) return <p>Carregando...</p>
  if (isError || !data) return <p>Erro ao carregar dados</p>

  // 🔹 Tons de azul (iguais ao gráfico de pizza)
  const colors = data.map((_, index) => `hsl(220 80% ${70 - index * 8}%)`)

  // 🔹 Config do Shadcn
  const chartConfig: ChartConfig = data.reduce((acc, item, index) => {
    acc[item.continent] = {
      label: item.continent,
      color: colors[index],
    }
    return acc
  }, {} as ChartConfig)

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Vacinação por Continente (Total Acumulado)</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
          <BarChart accessibilityLayer data={data}>
            
            {/* Grade no estilo Shadcn */}
            <CartesianGrid vertical={false} strokeOpacity={0.2} />

            {/* Eixo X formatado */}
            <XAxis
              dataKey="continent"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => chartConfig[value]?.label ?? value}
            />

            <YAxis tickFormatter={(v) => formatNumber(v)} />

            <ChartTooltip 
              cursor={false}
              content={<ChartTooltipContent />} 
            />

            <Bar
              dataKey="total_vaccinations"
              radius={8}
              strokeWidth={2}
              activeBar={({ ...props }) => (
                <Rectangle
                  {...props}
                  fillOpacity={0.85}
                  stroke={props.fill}
                  strokeDasharray={4}
                />
              )}
            >
              {data.map((entry, index) => (
                <Cell key={entry.continent} fill={colors[index]} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
