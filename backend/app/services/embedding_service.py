from sentence_transformers import SentenceTransformer
import torch

model = SentenceTransformer("BAAI/bge-small-en-v1.5")

def generate_embedding(text):
    """Generate embedding with memory optimization"""
    try:
        # Use reduction to avoid memory issues with GPU
        embedding = model.encode(
            text,
            convert_to_tensor=False,
            show_progress_bar=False,
            device='cpu'  # Use CPU to avoid GPU memory issues
        )
        return embedding.tolist()
    except Exception as e:
        print(f"Embedding generation failed: {str(e)[:100]}")
        # Return zero vector as fallback (should rarely happen)
        return [0.0] * 384