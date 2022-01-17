import os
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from baseModels import Clothing, WeatherData, ClothingSet, User, PredictionInput

app = FastAPI()

from clothing_database import (
    fetch_all_clothings,
    fetch_one_clothing,
    create_one_clothing,
    remove_one_clothing
)

from weather_database import (
    create_one_weather_data
)

from user_database import (
    fetch_particulars,
    create_one_particulars
)

from predictionModel import (
    predict_clothing,
    save_user_feedback,
    create_prediction_params
)

# some middleware stuff, unsure if relevant
origins = ['http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"]
)

###########################
#### USER PARTICULARS  ####
###########################

# input of user's particulars, a database of height, weight, etc columns
@app.get("/get-particulars", response_model=User)
async def get_particulars():
    response = await fetch_particulars()
    return response 

@app.post("/create-particulars", response_model=User)
async def create_particulars(particulars : User):
    response = await create_one_particulars(particulars.dict())
    if response: return response
    raise HTTPException(400, "Something went wrong")

###########################
#### CLOTHING DATABASE ####
###########################

# connected to db
@app.get("/get-all-clothings")
async def get_clothings():
    response = await fetch_all_clothings()
    return response 

# connected to db
@app.get("/get-clothing-by-id", response_model=Clothing)
async def get_clothing_by_id(clothing_id : int):   
    response = await fetch_one_clothing(clothing_id)
    return response 

# connected to db
@app.post("/create-clothing", response_model=Clothing)
async def create_clothing(clothing : Clothing):
    response = await create_one_clothing(clothing.dict())
    if response: return response
    raise HTTPException(400, "Something went wrong")

@app.delete("/delete-clothing-by-id")
async def delete_clothing(clothing_id : int):
    if get_clothing_by_id(clothing_id) == "null":
        return {"Error" : "Clothing does not exist"}
    else:
        response = await remove_one_clothing(clothing_id)
        return response


###########################
#### WEATHER  DATABASE ####
###########################

@app.post("/create-weather-data", response_model=WeatherData)
async def create_weather_data(weather_data : WeatherData):
    response = await create_one_weather_data(weather_data.dict())
    if response: return response
    raise HTTPException(400, "Something went wrong")


###########################
#### ML PREDICTION     ####
###########################

@app.post("/send-prediction-params")
async def send_prediction_params(prediction_input : PredictionInput):
    response = await create_prediction_params(prediction_input.dict())
    return response 

@app.get("/predict-clothing-set")
async def get_clothing_set_prediction(date : str): # question: what input? 
    response = await predict_clothing(date) # prediction_input.dict()
    if response: return response
    raise HTTPException(400, "Something went wrong")
    # return {"Message": "Received"}

# maybe this can be stored in another database with prediction + feedback for future training
@app.post("/save-user-feedback")
async def save_user_feedback(feedback : int): # 0: too hot, 1: ok, 2: too cold
    response = await save_user_feedback(feedback)
    return response

###########################
#### AUTHENTICATION    ####
###########################
'''
app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.get("/items/")
async def read_items(token: str = Depends(oauth2_scheme)):
    return {"token": token}
'''

