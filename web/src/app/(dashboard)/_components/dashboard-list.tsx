"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardData } from "@/features/dashboard/types/dashboard.types";

interface DashboardListProps {
  data?: DashboardData[];
  isLoading: boolean;
  isError: boolean;
}

export function DashboardList({ data, isLoading, isError }: DashboardListProps) {
  if (isLoading) {
    return <p className="p-4">Carregando dados...</p>;
  }

  if (isError) {
    return <p className="p-4 text-red-500">Erro ao carregar os dados.</p>;
  }

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>País</TableHead>
              <TableHead>Novos casos</TableHead>
              <TableHead>Novas mortes</TableHead>
              <TableHead>Total de casos</TableHead>
              <TableHead>Total de mortes</TableHead>
              <TableHead>Total de vacinas</TableHead>
              <TableHead>População</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.country}</TableCell>
                <TableCell>{item.newCases}</TableCell>
                <TableCell>{item.newDeaths}</TableCell>
                <TableCell>{item.totalCases}</TableCell>
                <TableCell>{item.totalDeaths}</TableCell>
                <TableCell>{item.vaccines}</TableCell>
                <TableCell>{item.population}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}