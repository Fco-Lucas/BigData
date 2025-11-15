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
