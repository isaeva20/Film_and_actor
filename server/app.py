from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from json import load
import uvicorn

app = FastAPI()

origins = [
    "http://127.0.0.1:5500",
    "http://7bltnx76-5500.euw.devtunnels.ms/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["POST", "GET"],
    allow_headers = ["*"],
    max_age = 3600,
)

@app.get('/api/films')
async def get_films():
    with open('server\\films.json', 'r', encoding='utf-8') as file:
        json_data = jsonable_encoder(load(file))

    return JSONResponse(status_code=200, content=json_data)


if __name__ == '__main__':
    uvicorn.run("app:app", reload=True)