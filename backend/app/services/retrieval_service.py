from app.services.embedding_service import generate_embedding
from app.services.vector_db import search_vectors
from typing import Dict, List, Tuple
import time

# Relevance threshold - minimum similarity score to consider data relevant
# Using 0.55 for balanced filtering
RELEVANCE_THRESHOLD = 0.55

def retrieve_documents(query) -> Tuple[List[str], List[Dict], bool]:
    """
    Retrieve documents and their sources for a query.
    
    Returns:
        Tuple of (contexts: list of text chunks, sources: list of source metadata, 
                  is_relevant: bool indicating if results are relevant)
    """
    # Generate query embedding
    embed_start = time.time()
    vector = generate_embedding(query)
    embed_time = time.time() - embed_start
    print(f"   Embedding: {embed_time:.2f}s")
    
    # Search vector database
    search_start = time.time()
    results = search_vectors(vector)
    search_time = time.time() - search_start
    print(f"   Vector Search: {search_time:.2f}s")
    
    contexts = []
    sources = []
    seen_docs = set()
    is_relevant = False
    
    for r in results:
        # Get similarity score from Qdrant result
        score = getattr(r, 'score', 0)
        
        # Only include results above relevance threshold
        if score >= RELEVANCE_THRESHOLD:
            is_relevant = True
            contexts.append(r.payload["text"])
            
            # Track unique source documents
            doc_name = r.payload.get("document_name", "Unknown")
            category = r.payload.get("category", "Unknown")
            
            source_key = f"{category}/{doc_name}"
            if source_key not in seen_docs:
                sources.append({
                    "filename": doc_name,
                    "category": category,
                    "path": source_key
                })
                seen_docs.add(source_key)
    
    return contexts, sources, is_relevant