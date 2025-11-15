from typing import List, Optional
import pandas as pd
from app.core.loader import load_covid_data

# Carrega uma única vez (cache simples)
df = load_covid_data()

def get_global_summary():
  latest_df = df.sort_values("date").groupby("country").tail(1)
  latest_df = latest_df[["country", "total_cases"]]
  latest_df = latest_df.sort_values("total_cases", ascending=False).head(10)
  return latest_df.to_dict(orient="records")

def get_continent_summary():
  # Pega apenas o último registro de cada país
  latest_df = df.sort_values("date").groupby("country").tail(1)

  grouped = (
    latest_df.groupby("continent", dropna=True)["new_cases"]
    .sum()
    .reset_index()
    .sort_values("new_cases", ascending=False)
  )

  return grouped.to_dict(orient="records")

def get_summary_by_country_timeseries(country):
  df_country = df[df["country"].str.lower() == country.lower()]
  if df_country.empty:
    return []
  
  # Ordena cronologicamente
  df_country = df_country.sort_values("date")

  return df_country.to_dict(orient="records")

def get_continent_vaccinations():
  latest_df = df.sort_values("date").groupby("country").tail(1)
  grouped = (
    latest_df.groupby("continent", dropna=True)["total_vaccinations"]
    .sum()
    .reset_index()
    .sort_values("total_vaccinations", ascending=False)
  )
  return grouped.to_dict(orient="records")

def filter_data(country: Optional[str] = None, start_date: Optional[str] = None, end_date: Optional[str] = None):
  filtered = df.copy()

  if country:
    filtered = filtered[filtered["country"].str.lower() == country.lower()]

  if start_date:
    filtered = filtered[filtered["date"] >= pd.to_datetime(start_date)]
  if end_date:
    filtered = filtered[filtered["date"] <= pd.to_datetime(end_date)]

  return filtered