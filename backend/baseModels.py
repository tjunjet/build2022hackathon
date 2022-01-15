from pydantic import BaseModel
from datetime import date
from typing import Optional

# base mode for clothings
class Clothing(BaseModel):
    clothing_id : int
    name : str
    category : str

class WeatherData(BaseModel):
    date : date
    temperature: int
    humidity: int
    precipitation: int
    windSpeed: int

class ClothingSet(BaseModel):
    thermals : bool
    hoodie : bool
    lightDown : bool
    thickDown : bool
    windbreaker : bool
    umbrella : bool

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
    temperature: int
    humidity: int
    precipitation: int
    windSpeed: int
    age : int
    weight : float
    height : int
    sex : bool # 0 for M, 1 for F
    fatpercentage : float
    bmi : float
   