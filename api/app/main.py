from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import covid_router

# Cria a instância da API
app = FastAPI(
  title="COVID API", 
  description="API simples para dados COVID-19 usando Pandas", 
  version="1.0"
)

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],        # Pode ser "*" ou lista de domínios
  allow_credentials=True,
  allow_methods=["*"],        # GET, POST, PUT, DELETE, OPTIONS...
  allow_headers=["*"],        # Aceita todos os headers
)
  
app.include_router(covid_router.router)

@app.get("/")
def root():
  return { "message": "API de COVID-19 está online" }
