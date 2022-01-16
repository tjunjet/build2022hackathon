from baseModels import Clothing
import motor.motor_asyncio
client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')
database = client["weather_app"]
collection = database["clothing_list"]

async def fetch_all_clothings():
    all_clothings = []
    cursor = collection.find({}) # find all items
    async for item in cursor:
        all_clothings.append(Clothing(**item))
    return all_clothings

async def fetch_one_clothing(clothing_id):
    item = await collection.find_one({"clothing_id": clothing_id})
    return item

# multiple clothing with the same name can be added!
async def create_one_clothing(clothing : Clothing):
    item = clothing
    result = await collection.insert_one(item)
    return result 

async def remove_one_clothing(clothing_id):
    await collection.delete_one({"clothing_id": clothing_id})
    return True