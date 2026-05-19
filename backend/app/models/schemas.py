from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class ChatRequest(BaseModel):
    query: str
    filters: Optional[dict] = {}
    top_k: Optional[int] = 5
    
    class Config:
        json_schema_extra = {
            "example": {
                "query": "What is dearness allowance?",
                "filters": {},
                "top_k": 5
            }
        }

class SourceDocument(BaseModel):
    filename: str
    category: str
    path: str

class ChatResponse(BaseModel):
    answer: str
    sources: List[SourceDocument] = []
    
    class Config:
        json_schema_extra = {
            "example": {
                "answer": "Dearness allowance is...",
                "sources": [
                    {
                        "filename": "disability 1.pdf",
                        "category": "schemes",
                        "path": "schemes/disability 1.pdf"
                    }
                ]
            }
        }

# User Schemas
class UserBase(BaseModel):
    phone_number: str
    name: str
    role: str = "user"

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    phone_number: str
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class TokenData(BaseModel):
    phone_number: Optional[str] = None