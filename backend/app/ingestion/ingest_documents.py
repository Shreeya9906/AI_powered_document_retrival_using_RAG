import os
import uuid

from app.ingestion.pdf_loader import load_pdf
from app.ingestion.chunker import chunk_text
from app.services.embedding_service import generate_embedding
from app.services.vector_db import insert_vector, create_collection

DATASET_PATH = r"C:\Users\SHREEYASWINI P\OneDrive\Desktop\retrival\backend\dataset"

def ingest():

    first_vector = None
    processed_count = 0
    skipped_count = 0

    for category in os.listdir(DATASET_PATH):

        folder = os.path.join(DATASET_PATH, category)

        if not os.path.isdir(folder):
            continue

        for file in os.listdir(folder):

            if not file.endswith(".pdf"):
                continue

            file_path = os.path.join(folder, file)

            print("Processing:", file)

            try:
                text = load_pdf(file_path)

                if not text or text.strip() == "":
                    print(f"  [SKIPPED] No text extracted")
                    skipped_count += 1
                    continue

                chunks = chunk_text(text)

                for chunk in chunks:
                    try:
                        vector = generate_embedding(chunk)

                        if first_vector is None:
                            create_collection(len(vector))
                            first_vector = vector

                        payload = {
                            "document_name": file,
                            "category": category,
                            "text": chunk
                        }

                        insert_vector(
                            id=str(uuid.uuid4()),
                            vector=vector,
                            payload=payload
                        )
                    except Exception as chunk_error:
                        print(f"  [ERROR] embedding chunk: {str(chunk_error)[:50]}... Skipping chunk.")
                        continue
                
                processed_count += 1
                print(f"  [SUCCESS] Processed successfully")
            
            except Exception as file_error:
                print(f"  [ERROR] processing file: {str(file_error)[:100]}")
                skipped_count += 1
                continue
    
    print(f"\n[INGESTION COMPLETE!]")
    print(f"   Processed: {processed_count} documents")
    print(f"   Skipped: {skipped_count} documents")

if __name__ == "__main__":
    ingest()