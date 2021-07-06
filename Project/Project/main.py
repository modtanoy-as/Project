from logging import debug
from fastapi import FastAPI
from starlette.responses import RedirectResponse 
import uvicorn
from routers import checkpattern
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    res = RedirectResponse('/docs')
    return res


app.include_router(checkpattern.router)


if __name__ == "__main__":
    uvicorn.run('main:app', host="127.0.0.1" , reload=True)