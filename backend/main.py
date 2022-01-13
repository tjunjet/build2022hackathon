import os
from fastapi import FastAPI, HTTPException
from typing import Optional
from pydantic import BaseModel

app = FastAPI()

from database import (
    fetch_one_clothing,
    create_one_clothing
)


particulars = {
    "age" : {  },
    "weight" : { },
    "height" : { },
    "gender": { }
}

clothings = {
    1: {
        "name": "cmu hoodie",
        "category": "hoodie"
    }
}

class Clothing(BaseModel):
    name : str
    category : str

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

# creation of clothing list
@app.get("/get-clothing/{clothing_id}")
def get_clothing(clothing_id : int):
    response = fetch_one_clothing()
    return response 
    # return clothings[clothing_id]

@app.get("/get-by-name/{clothing_id}")
def get_clothing_by_name(*, clothing_id : int, name: Optional[str] = None):
    for clothing_id in clothings:
        if clothings[clothing_id]["name"] == name:
            return clothings[clothing_id]
        return {"Data": "Not found"}        

@app.post("/create-clothing/{clothing_id}")
def create_clothing(clothing_id : int, clothing : Clothing):
    response = create_one_clothing(clothing)
    if response: return response
    raise HTTPException(400, "Something went wrong")
    # if clothing_id in clothings:
    #     return {"Error": "Clothing exists"}
    # clothings[clothing_id] = clothing
    # return {"clothing_id": clothing_id}

@app.delete("/delete-clothing/{clothing_id}")
def delete_clothing(clothing_id : int):
    if clothing_id not in clothings:
        return {"Error": "Clothing does not exist"}
    
    del clothings[clothing_id]
    return {"Message": "Clothing deleted successfully"}