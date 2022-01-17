import tensorflow as tf
import numpy as np
from baseModels import PredictionInput
import motor.motor_asyncio
client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')
database = client["weather_app"]
collection = database["prediction_input"]


# model = tf.keras.models.load_model("ANN.h5")

clothing_list = [
    'thermal', 
    'hoodie', 
    'fleece', 
    'light_down', 
    'thick_down',
    'wind_breaker',
    'umbrella',
    'winter_boots'
]

async def create_prediction_params(prediction_input : PredictionInput):
    item = prediction_input
    # model stuff goes here
    prediction_input["output"] = None
    result = await collection.insert_one(prediction_input)
    return item 

async def predict_clothing(date : str): #prediction_input
    suggested_clothing_set = await collection.find({"date" : date}).select("output")
    return suggested_clothing_set
    '''
    clothing_available = np.array([])
    for clothing_type in prediction_input["clothes"]:
        if prediction_input["clothes"][clothing_type]:
            np.append(clothing_available, clothing_type)

    suggested_clothing_set = None
    ideal_feedback_score = None

    for clothing_type in prediction_input["clothes"]:
        test_clothing = np.array([]) # generated based on the clothing avail
        test_input = np.array([]) # combine clothing + weather data from prediction input
        predicted_feedback = model.predict(test_input)
        if ideal_feedback_score == None or predicted_feedback < ideal_feedback_score:
            suggested_clothing_set = test_clothing
    '''

def save_user_feedback(feedback): # save in the database 
    return feedback 
