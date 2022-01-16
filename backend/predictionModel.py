import tensorflow as tf
import numpy as np

model = tf.keras.models.load_model("ANN.h5")

def predict_clothing(prediction_input):
    suggested_clothing_set = model.predict(prediction_input)
    return suggested_clothing_set 

def save_user_feedback(feedback): # save in the database 
    return feedback 

test_input = np.array[0,12,34,40,48,60.0,150.0,1,12.5,5]

print(predict_clothing(test_input))