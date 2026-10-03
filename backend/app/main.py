from datetime import datetime, timezone
from typing import Literal
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Chat Agent API", version="0.1.0")
app.add_middleware(CORSMiddleware,allow_origins=["http://localhost:5173"],allow_credentials=True,allow_methods=["*"],allow_headers=["*"])

class MessageIn(BaseModel):
    room_id: str
    sender: str
    text: str

class Message(MessageIn):
    id: int
    kind: Literal["human","agent"]
    created_at: datetime

messages: list[Message] = []

@app.get("/health")
def health():
    return {"status":"ok","service":"chat-agent-api"}

@app.get("/rooms/{room_id}/messages", response_model=list[Message])
def room_messages(room_id: str):
    return [m for m in messages if m.room_id == room_id]

@app.post("/rooms/{room_id}/messages", response_model=Message)
def create_message(room_id: str, payload: MessageIn):
    message=Message(id=len(messages)+1,room_id=room_id,sender=payload.sender,text=payload.text,kind="human",created_at=datetime.now(timezone.utc))
    messages.append(message)
    return message

@app.get("/agents")
def agents():
    return [
        {"id":"developer","name":"Developer","role":"Full-stack engineer","activation":"mention"},
        {"id":"designer","name":"Designer","role":"Product designer","activation":"mention"},
        {"id":"tester","name":"Tester","role":"Quality reviewer","activation":"mention"},
    ]
