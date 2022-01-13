from model import WeatherData
import motor.motor_asyncio
client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')
database = client["weather_app"]
collection = database["weather_data"]

async def create_one_weather_data(weather_data : WeatherData):
    item = weather_data
    result = await collection.insert_one(item)
    return item 
