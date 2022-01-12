from fastapi import FastAPI

app = FastAPI()

user = {
    "age" : { },
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

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/get-clothing/{clothing_id}")
async def read_clothing(clothing_id):
    return {"clothing_id": clothing_id}

@app.post("/create-clothing/{clothing_id}")
async def create_clothing(clothing_id : int, clothing : clothings):
    if clothing_id in clothings:
        return {"Error": "Clothing exists"}
    clothings[clothing_id] = clothing
    return {"clothing_id": clothing_id}
    