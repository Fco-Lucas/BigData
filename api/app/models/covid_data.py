from pydantic import BaseModel
from datetime import date
from typing import Optional

class CovidRecord(BaseModel):
  date: date
  country: str
  new_cases: Optional[float] = None
  new_deaths: Optional[float] = None
  total_cases: Optional[float] = None
  total_deaths: Optional[float] = None
  total_vaccinations: Optional[float] = None
  population: Optional[float] = None

class CovidRecordSummary(BaseModel):
  country: str
  total_cases: Optional[float] = None