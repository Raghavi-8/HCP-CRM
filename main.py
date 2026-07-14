import os
import json
from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from ai import get_ai_response

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
print(api_key)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5175","http://localhost:5174","http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.get("/")

def home():
    return {
        "message": "HCP CRM Backend is running successfully!"
    }

@app.post("/log-interaction")
def log_interaction(request: ChatRequest):

    print("Request received")

    ai_response = get_ai_response(request.message)

    print("Returned from AI")
    print(repr(ai_response))

    try:
        data = json.loads(ai_response)
        return data

    except Exception as e:
        print(ai_response)
        return {
        "error": str(e),
        "response": ai_response
        }