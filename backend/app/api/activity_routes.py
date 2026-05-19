from fastapi import APIRouter
from app.services.activity_service import get_activities, get_stats

router = APIRouter()

@router.get("/api/activities")
async def read_activities():
    return get_activities()

@router.get("/api/stats")
async def read_stats():
    return get_stats()
