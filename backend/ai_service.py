import os
import json
from dotenv import load_dotenv
from google import genai

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
MODEL = os.getenv("GEMINI_MODEL", "gemini-3.5-flash-lite")

client = genai.Client(api_key=API_KEY)


def analyze_resume(resume_text):

    prompt = f"""
You are an AI career assistant.

Analyze the following student's resume carefully.

Extract:

1. Name
2. Education
3. Skills
4. Projects
5. Work experience
6. Certifications
7. Programming languages
8. Tools and technologies

Return ONLY valid JSON.

Use exactly this structure:

{{
    "name": "",
    "education": [],
    "skills": [],
    "projects": [],
    "experience": [],
    "certifications": [],
    "programming_languages": [],
    "tools": []
}}

Do not add markdown.
Do not add ```json.
Do not add explanations.

Resume:

{resume_text}
"""

    response = client.models.generate_content(
        model=MODEL,
        contents=prompt
    )

    result = response.text.strip()

    if result.startswith("```json"):
        result = result.replace("```json", "", 1)

    if result.endswith("```"):
        result = result[:-3]

    return json.loads(result.strip())


def generate_roadmap(prompt):

    response = client.models.generate_content(
        model=MODEL,
        contents=prompt
    )

    result = response.text.strip()

    if result.startswith("```json"):
        result = result.replace("```json", "", 1)

    if result.endswith("```"):
        result = result[:-3]

    return json.loads(result.strip())