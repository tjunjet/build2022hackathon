import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from baseModels import Clothing, WeatherData, ClothingSet

app = FastAPI()

from clothing_database import (
    fetch_all_clothings,
    fetch_one_clothing,
    create_one_clothing,
)

from weather_database import (
    create_one_weather_data
)

from predictionModel import (
    predict_clothing
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

particulars = {
    "age" : {  },
    "weight" : { },
    "height" : { },
    "gender": { },
    "location": { }
}


###########################
#### USER PARTICULARS  ####
###########################

# input of user's particulars
@app.get("/get-particulars/{info_type}")
def get_particulars(info_type : str):
    return {info_type : particulars[info_type]}

@app.post("/create-particulars/{info_type}")
def create_particulars(info_type : str, info : int):
    if info_type not in particulars:
        return {"Error": "Invalid type of particulars"}
    particulars[info_type] = info
    return {"info type": info_type}

###########################
#### CLOTHING DATABASE ####
###########################

# connected to db
@app.get("/get-all-clothings}")
async def get_clothings():
    response = await fetch_all_clothings()
    return response 

# connected to db
@app.get("/get-clothing-by-name/clothing{name}", response_model=Clothing)
async def get_clothing_by_name(name: str):   
    response = await fetch_one_clothing(name)
    return response 

# connected to db
@app.post("/create-clothing/clothing{name}", response_model=Clothing)
async def create_clothing(clothing : Clothing):
    response = await create_one_clothing(clothing.dict())
    if response: return response
    raise HTTPException(400, "Something went wrong")

# @app.delete("/delete-clothing/{clothing_id}")
# def delete_clothing(clothing_id : int):
#     if clothing_id not in clothings:
#         return {"Error": "Clothing does not exist"}
    
#     del clothings[clothing_id]
#     return {"Message": "Clothing deleted successfully"}


###########################
#### WEATHER  DATABASE ####
###########################

@app.post("/create-weather-data/weather{time}", response_model=WeatherData)
async def create_weather_data(weather_data : WeatherData):
    response = await create_one_weather_data(weather_data.dict())
    if response: return response
    raise HTTPException(400, "Something went wrong")


###########################
#### ML PREDICTION     ####
###########################

@app.get("/predict-clothing-set", response_model=ClothingSet)
async def get_clothing_set_prediction(): # question: what input?
    response = await predict_clothing()
    return response 