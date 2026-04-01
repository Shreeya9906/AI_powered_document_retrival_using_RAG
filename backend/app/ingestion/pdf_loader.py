import re
from pathlib import Path
from pypdf import PdfReader

try:
    import pdfplumber
    HAS_PDFPLUMBER = True
except ImportError:
    HAS_PDFPLUMBER = False

def clean_text(text):
    """
    Clean extracted text by removing garbled characters and normalizing whitespace.
    """
    if not text:
        return ""
    
    # Fix common encoding issues
    text = text.encode('utf-8', errors='ignore').decode('utf-8')
    
    # Remove corrupted UTF-8 sequences (mojibake patterns like "Â°" or "Â¹")
    # These typically occur from double-encoding issues
    text = re.sub(r'Â[¹-º]', '', text)
    text = re.sub(r'Â[À-Ÿ]', '', text)
    
    # Remove zero-width characters and other invisible Unicode characters
    text = ''.join(char for char in text if ord(char) >= 32 or char in '\n\t\r')
    
    # Remove control characters
    text = re.sub(r'[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F-\x9F]', '', text)
    
    # Remove excessive special character sequences that look like corruption
    text = re.sub(r'([^\w\s\.\,\!\?\;\:\-\(\)\[\]\{\}äöüßÄÖÜµ]){5,}', '', text)
    
    # Fix multiple spaces
    text = re.sub(r' +', ' ', text)
    
    # Fix multiple newlines
    text = re.sub(r'\n\n\n+', '\n\n', text)
    
    # Clean up lines that are mostly special characters (likely corruption)
    lines = text.split('\n')
    cleaned_lines = []
    for line in lines:
        # Skip lines that are >60% special characters
        special_count = sum(1 for c in line if not c.isalnum() and c not in ' \t\n\r.,:;!?-()[]{}äöüßÄÖÜµ')
        if len(line) > 0 and special_count / len(line) < 0.6:
            cleaned_lines.append(line)
    
    text = '\n'.join(cleaned_lines)
    
    # Remove leading/trailing whitespace
    text = text.strip()
    
    return text


def is_quality_text(text, min_length=100):
    """
    Check if extracted text is of reasonable quality.
    Returns False if text appears to be mostly corrupted.
    """
    if len(text) < min_length:
        return False
    
    # Count alphanumeric characters vs special characters
    alphanumeric = sum(1 for c in text if c.isalnum() or c.isspace())
    if alphanumeric / len(text) < 0.4:  # Less than 40% alphanumeric = likely garbage
        return False
    
    # Check for excessive non-ASCII sequences
    corrupted_patterns = sum(1 for c in text if ord(c) > 127)
    if corrupted_patterns / len(text) > 0.3:  # More than 30% non-ASCII = suspicious
        return False
    
    return True


def load_pdf_with_pdfplumber(file_path):
    """
    Extract text from PDF using pdfplumber for better quality extraction.
    """
    text = ""
    try:
        with pdfplumber.open(file_path) as pdf:
            for page_num, page in enumerate(pdf.pages):
                try:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
                except Exception as page_error:
                    print(f"  ⚠️ Skipping problematic page {page_num + 1}: {str(page_error)[:50]}")
                    continue
    except Exception as e:
        print(f"⚠️ pdfplumber extraction failed: {str(e)[:100]}")
        return None
    
    return text if text.strip() else None


def load_pdf_with_pypdf(file_path):
    """
    Fallback PDF extraction using pypdf.
    """
    try:
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
        return text if text else None
    except Exception as e:
        print(f"⚠️ PyPDF extraction failed: {e}")
        return None


def load_pdf(file_path):
    """
    Load and clean PDF text with quality validation.
    Uses pypdf for reliable PDF extraction.
    """
    file_path = str(file_path)
    
    print(f"📖 Loading: {Path(file_path).name}")
    
    # Use pypdf for extraction (fast and reliable)
    text = load_pdf_with_pypdf(file_path)
    
    if not text:
        print(f"⚠️ Could not extract text from {file_path}")
        return ""
    
    # Clean the extracted text
    text = clean_text(text)
    
    # Validate quality
    if is_quality_text(text):
        print(f"✅ Successfully extracted and cleaned")
        return text
    else:
        print(f"⚠️ Extracted text quality is low - may contain errors")
        return text


# Example usage for testing
if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        pdf_file = sys.argv[1]
        text = load_pdf(pdf_file)
        print(f"\n{'='*50}")
        print(text[:1000])  # Print first 1000 characters
        print(f"{'='*50}")
