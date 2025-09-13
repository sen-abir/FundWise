from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
from fastapi.responses import StreamingResponse
import json

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ========================= Models ========================= #
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class DemoRequestCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    notes: Optional[str] = None
    utm: Optional[dict] = None
    submittedAt: Optional[str] = None

class DemoRequest(DemoRequestCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)


# ========================= Routes ========================= #
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Demo Requests
@api_router.post("/demo-requests", response_model=DemoRequest)
async def create_demo_request(payload: DemoRequestCreate):
    demo = DemoRequest(**payload.dict())
    await db.demo_requests.insert_one(demo.dict())
    return demo

@api_router.get("/demo-requests", response_model=List[DemoRequest])
async def list_demo_requests(limit: int = 50):
    items = await db.demo_requests.find().sort("created_at", -1).to_list(limit)
    return [DemoRequest(**item) for item in items]


# Chat streaming placeholder (LLM integration to be wired with Emergent key)
class ChatInput(BaseModel):
    session_id: str
    message: str
    history: Optional[List[dict]] = None

@api_router.post("/chat/stream")
async def chat_stream(input: ChatInput):
    # If emergent key/config not present, stream a friendly message and  message end
    emergent_key = os.environ.get("EMERGENT_LLM_KEY") or os.environ.get("EMERGENT_UNIVERSAL_KEY")

    async def event_generator():
        if not emergent_key:
            msg = (
                "LLM not configured yet. Please provide Emergent LLM key and model routing."
            )
            yield f"data: {json.dumps({'type': 'info', 'content': msg})}\n\n"
            yield f"event: done\n\n"
            return
        # Placeholder progressive stream while integration is completed
        chunks = [
            "Thinking about your request... ",
            "Setting up AI routing... ",
            "This endpoint will respond with streamed AI messages after configuration."
        ]
        for c in chunks:
            yield f"data: {json.dumps({'type': 'chunk', 'content': c})}\n\n"
        yield f"event: done\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()