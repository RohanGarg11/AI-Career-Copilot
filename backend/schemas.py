from pydantic import BaseModel
from typing import List


class SkillGapRequest(BaseModel):
    skills: List[str]
    career: str


class RoadmapRequest(BaseModel):
    career: str
    existing_skills: List[str]
    missing_skills: List[str]

class PDFReportRequest(BaseModel):
    student_name: str
    career: str
    score: int
    existing_skills: List[str]
    missing_skills: List[str]
    required_skills: List[str]
    roadmap: dict