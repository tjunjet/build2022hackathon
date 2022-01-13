from pydantic import BaseModel
from datetime import datetime

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