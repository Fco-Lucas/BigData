import pandas as pd
from app.core.config import settings
import numpy as np

def load_covid_data():
  df = pd.read_csv(settings.DATA_PATH)

  # Normaliza colunas (garantindo consistência)
  df.columns = [col.strip().lower().replace(" ", "_") for col in df.columns]

  # Converte datas
  if "date" in df.columns:
    df["date"] = pd.to_datetime(df["date"], errors="coerce")

  # Remove linhas sem país
  if "country" in df.columns:
    df = df[df["country"].notna()]

  # Substitui todos os tipos problemáticos
  df = df.replace([np.nan, np.inf, -np.inf], None)

  # Converte explicitamente todos os valores para tipos JSON-safe
  df = df.astype(object)

  return df
