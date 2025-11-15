from fastapi import APIRouter, Query
from typing import Optional, List
from app.models.covid_data import CovidRecord, CovidRecordSummary
from app.services import covid_service

router = APIRouter(prefix="/covid", tags=["COVID"])

@router.get("/summary", response_model=List[CovidRecordSummary])
def get_global_summary():
  summary = covid_service.get_global_summary()
  return summary

@router.get("/continent-summary")
def get_continent_summary():
  summary = covid_service.get_continent_summary()
  return summary

@router.get("/timeseries/{country}", response_model=List[CovidRecord])
def get_country_timeseries(country: str):
  summary = covid_service.get_summary_by_country_timeseries(country)
  return summary

@router.get("/continent-vaccinations")
def get_continent_vaccinations():
  summary = covid_service.get_continent_vaccinations()
  return summary

@router.get("/filter", response_model=List[CovidRecord])
def filter_data(
  country: Optional[str] = Query(None),
  start_date: Optional[str] = Query(None),
  end_date: Optional[str] = Query(None),
):
  df = covid_service.filter_data(country, start_date, end_date)
  return df.to_dict(orient="records")
