from qdrant_client import QdrantClient
import os

QDRANT_DB_PATH = r"C:\Users\SHREEYASWINI P\OneDrive\Desktop\retrival\backend\qdrant_db"
COLLECTION_NAME = "education_documents"

def clear_db():
    print(f"Cleaning collection: {COLLECTION_NAME}")
    try:
        client = QdrantClient(path=QDRANT_DB_PATH)
        client.delete_collection(COLLECTION_NAME)
        print("✅ Collection deleted successfully")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    clear_db()
