# build 2022 hackathon

## backend
### installation instructions
python -m pip install fastapi
pip install uvicorn
pip install -r requirements.txt

### run live server
cd backend
uvicorn main:app --reload
open browser, go to http://127.0.0.1:8000

### swagger ui
http://127.0.0.1:8000/docs#/

### to utilise the apis
Example: http://localhost:8000/get-particulars/height 

### mongodb installation
https://www.mongodb.com/try/download/community
install mongodb community server, mongodb shell, mongodb compass

add C:\Program Files\MongoDB\Server\5.0\bin to windows environment variable

run mongod --version
if the relevant information shows, mongodb has been successfully installed
