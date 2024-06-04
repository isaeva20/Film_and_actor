from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from filmsController import FILMS
import uvicorn

def search_film(title: str = ''):
    return [film for film in FILMS if title in film['title'].lower()]


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

@app.post('/api/authorization')
async def authorization():
    return JSONResponse(status_code=200, content={'data': {'login': 'gaga', 'password': '1233', 'status': 'admin'}})

@app.get('/api/films')
async def get_films():
    json_data = jsonable_encoder(FILMS)
    return JSONResponse(status_code=200, content=json_data)

@app.post('/api/films/search')
async def searh_film(title: str = ''):
    json_data = jsonable_encoder(search_film(title))
    return JSONResponse(status_code=200, content=json_data)

if __name__ == '__main__':
    uvicorn.run("app:app", reload=True)