from json import load

def loadJson():
  with open('server\\films.json', 'r', encoding='utf-8') as file:
    return load(file)
  

FILMS = loadJson()