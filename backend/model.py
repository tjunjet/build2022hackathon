from pydantic import BaseModel

# base mode for clothings
class Clothing(BaseModel):
    name : str
    category : str