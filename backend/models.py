from pydantic import BaseModel
from typing import Optional, List

class Preferences(BaseModel):
    budget_level: Optional[str] = None
    culture: Optional[float] = None
    adventure: Optional[float] = None
    nature: Optional[float] = None
    beaches: Optional[float] = None
    nightlife: Optional[float] = None
    cuisine: Optional[float] = None
    wellness: Optional[float] = None
    urban: Optional[float] = None
    seclusion: Optional[float] = None
    avg_temp: Optional[float] = None
    ideal_durations: Optional[List[str]] = None
    region: Optional[str] = None
    top_n: Optional[int] = 5