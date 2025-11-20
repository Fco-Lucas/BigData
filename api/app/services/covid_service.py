from typing import List, Optional
import pandas as pd
from app.core.loader import load_covid_data
from app.models.covid_data import PaginatedResponse

# Carrega uma única vez (cache simples)
df = load_covid_data()

# Retorna o total de casos para cada país
def get_global_summary():
  # Filtra só países (remove agregados OWID_*)
  df_countries = df[df["continent"].notna()].copy()

  # Pega o maior total acumulado já registrado para cada país
  max_cases = (
    df_countries.groupby("country")["total_cases"]
    .max()
    .reset_index()
  )

  # Ordena por maior número de casos e pega o TOP 10
  max_cases = (
    max_cases.sort_values("total_cases", ascending=False)
    .head(10)
  )

  return max_cases.to_dict(orient="records")

# Retorna o total de casos para cada continente
def get_continent_summary():
  # Soma todos os casos novos de cada país ao longo da história
  total_new_cases = df.groupby("country")["new_cases"].sum().reset_index()

  # Obtém o continente de cada país
  continents = df.sort_values("date").groupby("country").tail(1)[["country", "continent"]]

  # Junta país + continente + total acumulado
  merged = total_new_cases.merge(continents, on="country", how="left")

  # Agrupa por continente e soma
  grouped = merged.groupby("continent")["new_cases"].sum().reset_index().sort_values("new_cases", ascending=False)

  return grouped.to_dict(orient="records")

# Retorna o total de vacinação por continente
def get_continent_vaccinations():
  # Pega o maior valor de vacinação registrado para cada país
  max_vax = df.groupby("country")["total_vaccinations"].max().reset_index()

  # Obtém o continente para cada país (usando último registro válido)
  continents = df.sort_values("date").groupby("country").tail(1)[["country", "continent"]]

  # Junta as tabelas
  merged = max_vax.merge(continents, on="country", how="left")

  # Agrupa por continente e soma
  grouped = merged.groupby("continent")["total_vaccinations"].sum().reset_index().sort_values("total_vaccinations", ascending=False)

  return grouped.to_dict(orient="records")

def filter_data(
  country: Optional[str] = None,  
  start_date: Optional[str] = None, 
  end_date: Optional[str] = None,
  page: int = 1,
  size: int = 20
):
  filtered = df.copy()

  if country:
    filtered = filtered[filtered["country"].str.lower() == country.lower()]

  if start_date:
    filtered = filtered[filtered["date"] >= pd.to_datetime(start_date)]
  if end_date:
    filtered = filtered[filtered["date"] <= pd.to_datetime(end_date)]

  # Ordena mais recente primeiro
  filtered = filtered.sort_values("date", ascending=False)

  # Calcular índices de paginação
  total = len(filtered)
  start = (page - 1) * size
  end = start + size

  page_data = filtered.iloc[start:end].to_dict(orient="records")

  return PaginatedResponse(
    page=page,
    size=size,
    total=total,
    pages=(total + size - 1) // size,
    data=page_data
  )