from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from filmsController import FILMS
import uvicorn

def search_film(title: str = ''):
    return [film for film in FILMS if title in film['title'].lower()]





class Film(BaseModel):
    title: str
    description: str
    rating: float
    duration: float
    year: int
    rating: float | None = None
    poster: str
    genre: list[str]
    age: int

app = FastAPI()

origins = [
    "http://127.0.0.1:5500",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
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

@app.post('/api/films/add')
async def add_film(film: Film):
    return JSONResponse(status_code=200, content={'data': 'ok'})

@app.delete('/api/films/delete')
async def delete_film(id: int):
    return JSONResponse(status_code=200, content={'data': 'ok'})

@app.put('/api/films/')
async def edit_film(id: int):
    return JSONResponse(status_code=200, content={'data': 'ok'})

if __name__ == '__main__':
    uvicorn.run("app:app", reload=True)