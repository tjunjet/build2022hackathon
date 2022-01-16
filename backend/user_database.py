from baseModels import User
import motor.motor_asyncio
client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')
database = client["weather_app"]
collection = database["user_particulars"]

async def fetch_particulars(name):
    item = await collection.find_one({"name": name})
    return item

async def create_one_particulars(particulars : User):
    item = particulars
    result = await collection.insert_one(particulars)
    return particulars 