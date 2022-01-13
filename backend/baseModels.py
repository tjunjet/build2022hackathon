from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# base mode for clothings
class Clothing(BaseModel):
    name : str
    category : str

class WeatherData(BaseModel):
    dateTime : datetime
    currTemp : float
    currHumidity : float
    currWind : float
    hourlyPop : float

class ClothingSet(BaseModel):
    thermals : bool
    hoodie : bool
    lightDown : bool
    thickDown : bool
    windbreaker : bool
    umbrella : bool

class User(BaseModel):
    username : str
    disabled: Optional[bool] = None