import fitz


def extract_text_from_pdf(file_path):
    text = ""

    pdf = fitz.open(file_path)

    for page in pdf:
        text += page.get_text()

    pdf.close()

    return text

import fitz


def extract_text_from_pdf(file_bytes):
    pdf = fitz.open(
        stream=file_bytes,
        filetype="pdf"
    )

    text = ""

    for page in pdf:
        text += page.get_text()

    pdf.close()

    return text