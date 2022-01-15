from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# base mode for clothings
class Clothing(BaseModel):
    clothing_id : int
    name : str
    category : str

class WeatherData(BaseModel):
    dateTime : datetime
    temp: int
    humidity: int
    windSpeed: int
    precipitationProb: int

class ClothingSet(BaseModel):
    thermals : bool
    hoodie : bool
    lightDown : bool
    thickDown : bool
    windbreaker : bool
    umbrella : bool

class User(BaseModel):
    user : int
    age : int
    weight : float
    height : int
    gender : bool # 0 for M, 1 for F
    fatpercentage : float
    bmi : float
    # username : str
    # disabled: Optional[bool] = None

    