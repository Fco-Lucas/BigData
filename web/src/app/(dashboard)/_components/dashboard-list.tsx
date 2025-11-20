"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardDataPagination } from "@/features/dashboard/types/dashboard.types";
import { formatDate, formatNumber } from "@/utils/formaters";

interface DashboardListProps {
  data?: DashboardDataPagination;
  isLoading: boolean;
  isError: boolean;
}

export function DashboardList({ data, isLoading, isError }: DashboardListProps) {
  const records = data?.data;

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
            {records?.length === 0 && <TableRow className="text-center"><TableCell colSpan={8}>Nenhum dado encontrado</TableCell></TableRow> }
            {records?.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{formatDate(item.date)}</TableCell>
                <TableCell>{item.country}</TableCell>
                <TableCell>{item.newCases && formatNumber(item.newCases)}</TableCell>
                <TableCell>{item.newDeaths && formatNumber(item.newDeaths)}</TableCell>
                <TableCell>{item.totalCases && formatNumber(item.totalCases)}</TableCell>
                <TableCell>{item.totalDeaths && formatNumber(item.totalDeaths)}</TableCell>
                <TableCell>{item.vaccines && formatNumber(item.vaccines)}</TableCell>
                <TableCell>{item.population && formatNumber(item.population)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}