import tensorflow as tf
import numpy as np
from baseModels import PredictionInput
import motor.motor_asyncio
import final_script

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')
database = client["weather_app"]
collection = database["prediction_input"]


# model = tf.keras.models.load_model("ANN.h5")

async def create_prediction_params(prediction_input : PredictionInput):
    await collection.insert_one(prediction_input, {"_id" : 0})
    # return the result with id in str
    # return result

async def predict_clothing(date : str): #prediction_input
    selected_dataset = await collection.find_one({"date" : date})
    print("selected:", selected_dataset)
    # model stuff here
    suggested_clothing_set = final_script.generatePrediction(selected_dataset)
    print("suggested:", suggested_clothing_set)
    return suggested_clothing_set

    # {
    #         "thermal": True,
    #         "hoodie": True,
    #         "fleece": False,
    #         "wool": False,
    #         "light_down": False,
    #         "thick_down": False,
    #         "wind_breaker": True,
    #         "umbrella": False,
    #         "winter_boots": False
    #     }

def save_user_feedback(feedback): # save in the database 
    return feedback 
