from fastapi import FastAPI
from app.api.chat_routes import router as chat_router

app = FastAPI(
    title="Education Document AI",
    description="RAG system for education documents",
    version="1.0.0"
)

# Include routers
app.include_router(chat_router)