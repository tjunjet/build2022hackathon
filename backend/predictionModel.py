## unconfirmed structure for getting ML model's prediction

from baseModels import WeatherData
import pickle

# filename = '' # add the saved model's path
# model = pickle.load(open(filename, 'rb'))

def predict_clothing(model, weather_data):
    # inputs = preprocessor(inputs)
    # label = model.predict([message])[0]
    # suggested_clothing = model.predict_proba([message])
    # return {'label': label, 'spam_probability': spam_prob[0][1]}
    # hard coded output atm 
    return {
        'thermals' : True,
        'hoodie' : True,
        'lightDown' : True,
        'thickDown' : True,
        'windbreaker' : True,
        'umbrella' : True}