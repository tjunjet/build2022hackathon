from pydantic import BaseModel
from typing import Optional
from typing import Dict

# base mode for clothings
class Clothing(BaseModel):
    clothing_id : int
    name : str
    category : str

class WeatherData(BaseModel):
    dateTime : str
    temperature: float
    humidity: int
    precipitation: int
    windSpeed: int

class ClothingSet(BaseModel):
    thermal : bool
    hoodie : bool
    fleece : bool
    light_down : bool
    thick_down : bool
    wind_breaker : bool
    umbrella : bool
    winter_boots : bool


class User(BaseModel):
    age : int
    weight : float
    height : int
    sex : bool # 0 for M, 1 for F
    fatpercentage : float
    bmi : float
    # username : str
    # disabled: Optional[bool] = None

class PredictionInput(BaseModel):
    dateTime : str
    temperature: float
    humidity: int
    precipitation: int
    windSpeed: int
    age : int
    weight : float
    height : int
    sex : int # 0 for M, 1 for F
    fatpercentage : float
    bmi : float
    # clothes : Dict[str, bool]
   