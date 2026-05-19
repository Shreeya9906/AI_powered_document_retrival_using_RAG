from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
from app.api.chat_routes import router as chat_router
from app.api.activity_routes import router as activity_router
from app.api.auth_routes import router as auth_router
from app.models.user_model import init_db

app = FastAPI(
    title="Education Document AI",
    description="RAG system for education documents",
    version="1.0.0"
)

# Include routers
app.include_router(chat_router)
app.include_router(activity_router)
app.include_router(auth_router)

@app.on_event("startup")
def startup_event():
    init_db()

# Serve frontend static files
frontend_dist = Path(__file__).parent.parent / "frontend" / "dist"
if frontend_dist.exists():
    app.mount("/assets", StaticFiles(directory=frontend_dist / "assets"), name="assets")
    
    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        """Serve frontend files, with SPA fallback to index.html"""
        file_path = frontend_dist / full_path
        if file_path.exists() and file_path.is_file():
            return FileResponse(file_path)
        # Fallback to index.html for SPA routing
        return FileResponse(frontend_dist / "index.html")