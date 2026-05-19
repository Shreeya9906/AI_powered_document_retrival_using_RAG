import json
import os
from datetime import datetime
from typing import List, Dict, Any
from pathlib import Path

ACTIVITY_FILE = Path(__file__).parent.parent.parent / "activity_log.json"

def get_activities() -> List[Dict[str, Any]]:
    if not ACTIVITY_FILE.exists():
        return []
    try:
        with open(ACTIVITY_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error reading activity log: {e}")
        return []

def add_activity(activity_type: str, title: str, status: str, color: str, question: str = None, answer: str = None, sources: List[str] = None):
    activities = get_activities()
    
    new_activity = {
        "id": len(activities) + 1,
        "type": activity_type,
        "title": title,
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "status": status,
        "color": color,
        "question": question,
        "answer": answer,
        "sources": sources or []
    }
    
    # Add to the beginning of the list (most recent first)
    activities.insert(0, new_activity)
    
    # Keep only the last 50 activities
    activities = activities[:50]
    
    try:
        with open(ACTIVITY_FILE, "w", encoding="utf-8") as f:
            json.dump(activities, f, indent=2)
    except Exception as e:
        print(f"Error writing activity log: {e}")

def get_stats() -> Dict[str, Any]:
    activities = get_activities()
    queries = [a for a in activities if a["type"] == "Queries"]
    answered = [q for q in queries if q["status"] == "Answered"]
    unanswered = [q for q in queries if q["status"] == "Unanswered" or "Data not found" in (q.get("answer") or "")]
    
    # Count documents
    doc_count = 0
    dataset_path = Path(__file__).parent.parent.parent / "dataset"
    if dataset_path.exists():
        for category in ["Guidelines", "circulars", "regulations", "schemes"]:
            cat_path = dataset_path / category
            if cat_path.exists():
                doc_count += len([f for f in cat_path.iterdir() if f.is_file() and f.suffix.lower() == ".pdf"])

    # Calculate daily counts for the last 7 days
    from datetime import timedelta
    now = datetime.now()
    daily_counts = []
    for i in range(6, -1, -1):
        day_date = now - timedelta(days=i)
        day_str = day_date.strftime("%Y-%m-%d")
        day_name = day_date.strftime("%a")
        # Count queries for this specific day
        count = sum(1 for q in queries if q["timestamp"].startswith(day_str))
        daily_counts.append({"day": day_name, "count": count})

    return {
        "total_queries": len(queries),
        "answered_queries": len(answered),
        "unanswered_queries": len(unanswered),
        "doc_count": doc_count,
        "daily_counts": daily_counts,
        "last_activity": activities[0]["timestamp"] if activities else None
    }
