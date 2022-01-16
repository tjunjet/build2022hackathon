import tensorflow as tf
import numpy as np

model = tf.keras.models.load_model("ANN.h5")

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

def predict_clothing(prediction_input):
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

    return suggested_clothing_set 

def save_user_feedback(feedback): # save in the database 
    return feedback 
