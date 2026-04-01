import google.generativeai as genai
from app.utils.config import GEMINI_API_KEY
import time

genai.configure(api_key=GEMINI_API_KEY)

# Try multiple models in order of preference
model = None
# Using more reliable model options for Gemini API
available_models = ["gemini-pro"]

for model_name in available_models:
    try:
        model = genai.GenerativeModel(model_name)
        print(f"✓ Using model: {model_name}")
        break
    except Exception as e:
        print(f"Model {model_name} not available: {e}")
        continue

if model is None:
    model = genai.GenerativeModel("gemini-pro")

def generate_answer(query, contexts):
    """
    Generate a comprehensive answer based on retrieved context using LLM.
    Creates a summary that synthesizes information from multiple document chunks.
    """
    start_time = time.time()
    
    # Join contexts with clear separators
    context_text = "\n\n---\n\n".join(contexts)

    prompt = f"""You are reading the following document excerpts and need to answer a question based on them.

Document Excerpts:
{context_text}

Question: {query}

Instructions:
1. First, understand the key information in these documents
2. Now, write a clear and comprehensive answer explaining what these documents say about the question
3. Write in a way that's easy to understand - explain the concepts and details clearly
4. Your answer should be complete - NOT cut off or incomplete
5. Do NOT end with ... or other trailing markers - finish your sentences properly
6. Answer should be well-organized with clear information
7. Include all important details from the documents

Comprehensive answer:"""

    try:
        response = model.generate_content(
            prompt,
            generation_config={
                'max_output_tokens': 4500,
                'temperature': 0.4,
                'top_p': 0.9,
            }
        )
        
        elapsed = time.time() - start_time
        print(f"✅ LLM response ready in {elapsed:.1f}s")
        
        answer = response.text.strip()
        
        # Remove trailing ellipsis
        while answer.endswith(('...', '..')):
            answer = answer[:-3 if answer.endswith('...') else 2].strip()
        
        # Ensure proper ending
        if answer and not answer.endswith('.'):
            answer = answer + '.'
        
        return answer if answer else f"Please see the source documents for information about {query}."
        
    except Exception as e:
        elapsed = time.time() - start_time
        print(f"⚠️ LLM error after {elapsed:.1f}s: {str(e)[:150]}")
        if contexts and len(contexts) > 0:
            # Combine useful excerpts
            combined = " ".join(contexts)
            summary = combined[:1200]
            # Clean ending
            if summary.rfind('.') > 200:
                summary = summary[:summary.rfind('.')+1]
            return summary
        return f"See source documents below for information about {query}."