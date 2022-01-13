from pydantic import BaseModel
import motor.motor_asyncio
client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')
database = client["weather_app"]
collection = database["clothing_list"]

class Clothing(BaseModel):
    name : str
    category : str

async def fetch_one_clothing(name):
    item = await collection.find_one({"name": name})
    return item

# multiple clothing with the same name can be added!
async def create_one_clothing(name, clothing : Clothing):
    item = clothing
    result = await collection.insert_one(item)
    return item 

async def remove_one_clothing(name):
    await collection.delete_one({"name":name})
    return True