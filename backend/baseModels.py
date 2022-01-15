from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# base mode for clothings
class Clothing(BaseModel):
    name : str
    category : str

class WeatherData(BaseModel):
    dateTime : datetime
    temp: int
    tempMin: int
    tempMax: int
    tempFeelsLike: int
    humidity: int
    windSpeed: int
    conditionID: int # what are the data types for these?
    conditionMain: int
    conditionDesc: int
    precipitationProb: int

class ClothingSet(BaseModel):
    thermals : bool
    hoodie : bool
    lightDown : bool
    thickDown : bool
    windbreaker : bool
    umbrella : bool

class User(BaseModel):
    name : str
    age : int
    weight : float
    height : float
    gender : bool
    # username : str
    # disabled: Optional[bool] = None

    