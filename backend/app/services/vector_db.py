from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance, PointStruct
from app.utils.config import COLLECTION_NAME, QDRANT_DB_PATH

client = QdrantClient(path=QDRANT_DB_PATH)

def create_collection(vector_size):

    collections = client.get_collections().collections
    names = [c.name for c in collections]

    if COLLECTION_NAME not in names:

        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(
                size=vector_size,
                distance=Distance.COSINE
            )
        )

def insert_vector(id, vector, payload):

    client.upsert(
        collection_name=COLLECTION_NAME,
        points=[PointStruct(
            id=id,
            vector=vector,
            payload=payload
        )]
    )

def search_vectors(vector, limit=5):
    """
    Search for similar vectors in the collection.
    Returns results with their similarity scores.
    """
    results = client.query_points(
        collection_name=COLLECTION_NAME,
        query=vector,
        limit=limit,
        with_payload=True
    ).points

    return results