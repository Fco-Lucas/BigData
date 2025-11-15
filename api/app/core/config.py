from pathlib import Path

class Settings:
  DATA_PATH = Path(__file__).resolve().parent.parent.parent / "data" / "compact.csv"

settings = Settings()
