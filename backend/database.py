from pydantic import BaseModel
import motor.motor_asyncio
client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')
database = client.weather_app
collection = database.clothing_list


class Clothing(BaseModel):
    name : str
    category : str

async def fetch_one_clothing(name):
    result = await collection.find_one({"name": name})
    return result

async def create_one_clothing(clothing : Clothing):
    result = await collection.insert_one(clothing)
    return result 