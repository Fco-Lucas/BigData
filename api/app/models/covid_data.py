from pydantic import BaseModel
from datetime import date
from typing import Optional, List

class CovidRecord(BaseModel):
  date: date
  country: str
  new_cases: Optional[float] = None
  new_deaths: Optional[float] = None
  total_cases: Optional[float] = None
  total_deaths: Optional[float] = None
  total_vaccinations: Optional[float] = None
  population: Optional[float] = None

class PaginatedResponse(BaseModel):
  page: int
  size: int
  total: int
  pages: int
  data: List[CovidRecord]

class CovidRecordSummary(BaseModel):
  country: str
  total_cases: Optional[float] = None

class CovidRecordContinentSummary(BaseModel):
  continent: str
  new_cases: Optional[float] = None

class CovidRecordContinentVaccinations(BaseModel):
  continent: str
  total_vaccinations: Optional[float] = None