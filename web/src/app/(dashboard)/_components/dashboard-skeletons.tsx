
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function DashboardListSkeleton() {
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
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export function DashboardSummaryChartSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <Skeleton className="mb-2 h-6 w-64" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent>
        <Skeleton className="min-h-[400px] w-full rounded-xl" />
      </CardContent>
    </Card>
  )
}

export function DashboardContinentSummarySkeleton() {
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent>
        <div className="mx-auto flex aspect-square max-h-[300px] items-center justify-center">
          <Skeleton className="h-full w-full rounded-full" />
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardContinentVaccinationsSkeleton() {
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent>
        <Skeleton className="min-h-[400px] w-full rounded-xl" />
      </CardContent>
    </Card>
  )
}
