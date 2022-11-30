import serial
import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
    "*"
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def index():
    return {
        "hello": "Welcome to the fastapi server",
        "Thank you": "for using this service"
    }
    

@app.get("/{data}")
async def index(data):
    arduino = serial.Serial(port='COM3', baudrate=9600, timeout=.1)
    arduino.write(bytes(data, 'utf-8'))
    time.sleep(0.05)
    data = arduino.readline()
    return data