from fastapi import APIRouter, HTTPException, status
from fastapi.responses import FileResponse
from app.models.schemas import ChatRequest, ChatResponse, SourceDocument
from app.services.retrieval_service import retrieve_documents
from app.services.llm_service import generate_answer
from app.services.activity_service import add_activity
import os
import time
from pathlib import Path

router = APIRouter()

@router.post("/api/chat", response_model=ChatResponse, summary="Chat with RAG System")
async def chat(request: ChatRequest):
    """
    Chat endpoint with Retrieval-Augmented Generation.
    Ask ANY question about the documents in the dataset.
    Returns answer and source documents, or "Data not found" if query is not related to dataset.
    
    Example queries:
    - "What is dearness allowance?"
    - "Tell me about PhD guidelines"
    - "What are internship programs?"
    """
    try:
        total_start = time.time()
        print(f"\nQUERY: {request.query}")
        
        # Validate query
        if not request.query or len(request.query.strip()) == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Query cannot be empty"
            )
        
        # Retrieve documents and check relevance
        retrieval_start = time.time()
        contexts, sources, is_relevant = retrieve_documents(request.query)
        retrieval_time = time.time() - retrieval_start
        print(f"Retrieval: {retrieval_time:.2f}s ({len(contexts)} chunks)")
        
        # If no relevant data found, return "Not present in database"
        if not is_relevant or not contexts:
            add_activity(
                activity_type="Queries",
                title=f"Asked: {request.query[:30]}...",
                status="Unanswered",
                color="amber",
                question=request.query,
                answer="Not present in database. This question is not related to the available documents.",
                sources=[]
            )
            return ChatResponse(
                answer="Not present in database. This question is not related to the available documents. Please ask about topics covered in the dataset.",
                sources=[]
            )
        
        # Generate answer from retrieved context
        llm_start = time.time()
        answer = generate_answer(request.query, contexts)
        llm_time = time.time() - llm_start
        print(f"LLM: {llm_time:.2f}s")
        
        # Convert sources to SourceDocument objects
        source_docs = [
            SourceDocument(
                filename=source["filename"],
                category=source["category"],
                path=source["path"]
            )
            for source in sources
        ]
        
        # Log activity
        add_activity(
            activity_type="Queries",
            title=f"Asked: {request.query[:30]}...",
            status="Answered",
            color="green",
            question=request.query,
            answer=answer,
            sources=[s.filename for s in source_docs]
        )
        
        total_time = time.time() - total_start
        print(f"TOTAL TIME: {total_time:.2f}s\n")
        
        return ChatResponse(answer=answer, sources=source_docs)
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"CRITICAL ERROR in /api/chat: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing your query: {str(e)}"
        )


@router.get("/api/download/{category}/{filename}", summary="Download PDF Document")
async def download_pdf(category: str, filename: str):
    """
    Download PDF document from the dataset.
    
    Args:
        category: Document category (circulars, Guidelines, regulations, schemes)
        filename: Name of the PDF file to download
    
    Returns:
        PDF file for download
    """
    try:
        # Normalize category names
        category_map = {
            'circulars': 'circulars',
            'guidelines': 'Guidelines',
            'regulations': 'regulations',
            'schemes': 'schemes',
        }
        
        category_normalized = category_map.get(category.lower())
        if not category_normalized:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid category: {category}"
            )
        
        # Construct file path safely
        base_path = Path(__file__).parent.parent.parent / "dataset" / category_normalized
        file_path = base_path / filename
        
        # Security check - ensure file is in dataset directory
        if not str(file_path).startswith(str(base_path)):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
        
        # Check if file exists
        if not file_path.exists() or not file_path.is_file():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"File not found: {filename}"
            )
        
        # Check if it's a PDF
        if not str(file_path).lower().endswith('.pdf'):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only PDF files can be downloaded"
            )
        
        # Return file as download
        return FileResponse(
            path=file_path,
            filename=filename,
            media_type="application/pdf"
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error downloading file: {str(e)}"
        )