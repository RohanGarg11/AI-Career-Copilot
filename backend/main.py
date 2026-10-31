import os

from fastapi.responses import FileResponse
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from resume_parser import extract_text_from_pdf
from ai_service import analyze_resume
from career_engine import analyze_career
from schemas import SkillGapRequest, RoadmapRequest, PDFReportRequest
from pdf_report import generate_career_report

import tempfile

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "AI Career Copilot is working!"
    }


@app.post("/api/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    file_bytes = await file.read()

    text = extract_text_from_pdf(file_bytes)

    return {
        "filename": file.filename,
        "resume_text": text
    }


@app.post("/api/analyze-resume")
async def analyze_resume_endpoint(
    file: UploadFile = File(...)
):

    file_bytes = await file.read()

    resume_text = extract_text_from_pdf(file_bytes)

    analysis = analyze_resume(resume_text)

    return {
        "filename": file.filename,
        "analysis": analysis
    }


@app.post("/api/skill-gap")
async def skill_gap(request: SkillGapRequest):

    try:

        result = analyze_career(
            request.skills,
            request.career
        )

        return result

    except ValueError as error:

        raise HTTPException(
            status_code=400,
            detail=str(error)
        )


@app.post("/api/generate-roadmap")
async def generate_roadmap(
    request: RoadmapRequest
):

    prompt = f"""
You are an expert career mentor.

Create a personalized learning roadmap.

Target career:
{request.career}

Skills the student already has:
{request.existing_skills}

Skills the student is missing:
{request.missing_skills}

Create a 6-month roadmap.

Return ONLY valid JSON using this structure:

{{
    "career": "{request.career}",
    "months": [
        {{
            "month": "Month 1",
            "topics": [],
            "projects": []
        }},
        {{
            "month": "Month 2",
            "topics": [],
            "projects": []
        }},
        {{
            "month": "Month 3",
            "topics": [],
            "projects": []
        }},
        {{
            "month": "Month 4",
            "topics": [],
            "projects": []
        }},
        {{
            "month": "Month 5",
            "topics": [],
            "projects": []
        }},
        {{
            "month": "Month 6",
            "topics": [],
            "projects": []
        }}
    ]
}}

Make the roadmap realistic for a college student.
Focus mainly on the missing skills.
Include practical projects.
"""

    from ai_service import generate_roadmap

    roadmap = generate_roadmap(prompt)

    return roadmap


@app.post("/api/generate-report")
async def generate_report(request: PDFReportRequest):

    temp_file = tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf"
    )

    temp_file.close()

    generate_career_report(
        output_path=temp_file.name,
        student_name=request.student_name,
        career=request.career,
        score=request.score,
        existing_skills=request.existing_skills,
        missing_skills=request.missing_skills,
        required_skills=request.required_skills,
        roadmap=request.roadmap,
    )

    return FileResponse(
        temp_file.name,
        media_type="application/pdf",
        filename="AI_Career_Copilot_Report.pdf",
    )