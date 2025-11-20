export interface DashboardFilters {
  country: string;
  start_date: string;
  end_date: string;
}

export interface DashboardData {
  date: string;
  country: string;
  newCases: number;
  newDeaths: number;
  totalCases: number;
  totalDeaths: number;
  vaccines: number;
  population: number;
}

export interface DashboardDataPagination {
  page: number;
  size: number;
  total: number;
  pages: number;
  data: DashboardData[];
}

export interface DashboardSummary {
  country: string;
  total_cases: number;
}

export interface DashboardContinentSummary {
  continent: string;
  new_cases: number;
}

export interface DashboardContinentVaccinations {
  continent: string;
  total_vaccinations: number;
}