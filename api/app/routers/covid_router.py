from fastapi import APIRouter, Query
from typing import Optional, List
from app.models.covid_data import CovidRecordSummary, CovidRecordContinentSummary, CovidRecordContinentVaccinations, PaginatedResponse
from app.services import covid_service

router = APIRouter(prefix="/covid", tags=["COVID"])

@router.get("/summary", response_model=List[CovidRecordSummary])
def get_global_summary():
  summary = covid_service.get_global_summary()
  return summary

@router.get("/continent-summary", response_model=List[CovidRecordContinentSummary])
def get_continent_summary():
  summary = covid_service.get_continent_summary()
  return summary

@router.get("/continent-vaccinations", response_model=List[CovidRecordContinentVaccinations])
def get_continent_vaccinations():
  summary = covid_service.get_continent_vaccinations()
  return summary

@router.get("/filter", response_model=PaginatedResponse)
def filter_data(
  country: Optional[str] = Query(None),
  start_date: Optional[str] = Query(None),
  end_date: Optional[str] = Query(None),
  page: int = Query(1, ge=1),
  size: int = Query(20, ge=1, le=200)
):
  df = covid_service.filter_data(country, start_date, end_date, page, size)
  return df
