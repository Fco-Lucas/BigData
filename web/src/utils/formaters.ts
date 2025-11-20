export function formatNumber(value: number): string {
  return new Intl.NumberFormat("pt-BR").format(value);
}

export function formatDate(date: string): string {
  if (!date) return "";
  // Assumes date is in YYYY-MM-DD format
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}
