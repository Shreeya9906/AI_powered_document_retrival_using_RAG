from langchain_text_splitters import RecursiveCharacterTextSplitter
import re

splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)

def clean_chunk(chunk):
    """
    Additional cleaning for text chunks.
    """
    # Remove extra whitespace
    chunk = re.sub(r' +', ' ', chunk)
    chunk = re.sub(r'\n\n\n+', '\n\n', chunk)
    
    # Remove lines that are mostly special characters
    lines = chunk.split('\n')
    cleaned_lines = []
    for line in lines:
        special_count = sum(1 for c in line if not c.isalnum() and c not in ' \t.,:;!?-()[]{}')
        if len(line) > 0 and special_count / len(line) < 0.6:  # Keep if <60% special chars
            cleaned_lines.append(line)
    
    return '\n'.join(cleaned_lines).strip()

def chunk_text(text):
    """
    Split text into chunks with quality validation.
    """
    if not text or len(text) < 100:
        return []
    
    chunks = splitter.split_text(text)
    
    # Clean and filter chunks
    cleaned_chunks = []
    for chunk in chunks:
        cleaned = clean_chunk(chunk)
        if len(cleaned) > 50:  # Only keep chunks with meaningful content
            cleaned_chunks.append(cleaned)
    
    return cleaned_chunks if cleaned_chunks else chunks