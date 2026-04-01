from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class ChatRequest(BaseModel):
    query: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "query": "What is dearness allowance?"
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
    email: str
    name: str
    role: str = "user"

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user: UserResponse

class TokenData(BaseModel):
    email: Optional[str] = None