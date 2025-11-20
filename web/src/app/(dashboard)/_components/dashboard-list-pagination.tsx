"use client"

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface DashboardListPaginationProps {
  page: number;
  pages: number;
  total: number;
  showCount: number;
  onFirst: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onLast: () => void;
  onSizeChange: (size: number) => void;
}

export function DashboardListPagination({ page, pages, total, showCount, onFirst, onPrevious, onNext, onLast, onSizeChange }: DashboardListPaginationProps) {
  return (
    <div className="flex mt-3 text-sm items-center justify-between">
      <span>Exibindo {showCount} de {total} registros</span>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <span>Registros por página</span>
          <Select defaultValue="20" onValueChange={(value) => onSizeChange(Number(value))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <span>Página {page} de {pages}</span>

        <div className="space-x-1.5">
          <Button size="icon" onClick={onFirst} disabled={page - 1 <= 0}>
            <ChevronsLeft className="size-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button size="icon" onClick={onPrevious} disabled={page - 1 <= 0}>
            <ChevronLeft className="size-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button size="icon" onClick={onNext} disabled={page + 1 > pages}>
            <ChevronRight className="size-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button size="icon" onClick={onLast} disabled={page + 1 > pages}>
            <ChevronsRight className="size-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}