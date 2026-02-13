from docx import Document
from PyPDF2 import PdfReader

def extract_text_from_resume(file_path: str) -> str:
    if file_path.endswith(".pdf"):
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return text.lower()

    if file_path.endswith(".docx"):
        doc = Document(file_path)
        return " ".join(p.text for p in doc.paragraphs).lower()

    return ""
