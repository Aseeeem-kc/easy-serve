import fitz  # PyMuPDF
import docx

def extract_text_from_pdf(file_path: str) -> str:
    text = ""
    try:
        with fitz.open(file_path) as pdf:
            for page in pdf:
                text += page.get_text()
        return text
    except Exception as e:
        raise Exception(f"PDF extraction failed: {str(e)}")


def extract_text_from_docx(file_path: str) -> str:
    try:
        doc = docx.Document(file_path)
        return "\n".join([p.text for p in doc.paragraphs])
    except Exception as e:
        raise Exception(f"DOCX extraction failed: {str(e)}")


def extract_text_from_txt(file_path: str) -> str:
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()
    except Exception as e:
        raise Exception(f"TXT extraction failed: {str(e)}")


def extract_text(file_path: str, file_type: str) -> str:
    """
    Auto-select extraction based on MIME type.
    """
    if file_type == "application/pdf":
        return extract_text_from_pdf(file_path)

    elif file_type in [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]:
        return extract_text_from_docx(file_path)

    elif file_type == "text/plain":
        return extract_text_from_txt(file_path)

    else:
        raise Exception("Unsupported document type")
