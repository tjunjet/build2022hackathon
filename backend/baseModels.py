from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# base mode for clothings
class Clothing(BaseModel):
    clothing_id : int
    name : str
    category : str

class WeatherData(BaseModel):
    temp: int
    tempMin: int
    tempMax: int
    tempFeelsLike: str
    humidity: str
    windSpeed: int
    conditionID: str # what are the data types for these?
    conditionMain: str
    conditionDesc: str
    precipitationProb: str

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

    