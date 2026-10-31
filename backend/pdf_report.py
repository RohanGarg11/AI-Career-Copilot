from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    PageBreak,
)
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
import os


def generate_career_report(
    output_path,
    student_name,
    career,
    score,
    existing_skills,
    missing_skills,
    required_skills,
    roadmap,
):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        rightMargin=18 * mm,
        leftMargin=18 * mm,
        topMargin=18 * mm,
        bottomMargin=18 * mm,
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        "TitleCustom",
        parent=styles["Title"],
        fontSize=26,
        leading=32,
        alignment=TA_CENTER,
        textColor=colors.HexColor("#8B5CF6"),
        spaceAfter=12,
    )

    subtitle_style = ParagraphStyle(
        "Subtitle",
        parent=styles["Normal"],
        fontSize=11,
        leading=16,
        alignment=TA_CENTER,
        textColor=colors.HexColor("#666666"),
        spaceAfter=20,
    )

    heading_style = ParagraphStyle(
        "HeadingCustom",
        parent=styles["Heading2"],
        fontSize=17,
        leading=22,
        textColor=colors.HexColor("#6D3FD6"),
        spaceBefore=12,
        spaceAfter=10,
    )

    normal_style = ParagraphStyle(
        "NormalCustom",
        parent=styles["Normal"],
        fontSize=10,
        leading=15,
        textColor=colors.HexColor("#333333"),
    )

    small_style = ParagraphStyle(
        "Small",
        parent=styles["Normal"],
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#555555"),
    )

    story = []

    story.append(Spacer(1, 10))
    story.append(Paragraph("AI Career Copilot", title_style))
    story.append(
        Paragraph(
            "Personalized Career Readiness Report",
            subtitle_style,
        )
    )

    summary_data = [
        ["Student", student_name or "Not Available"],
        ["Target Career", career],
        ["Career Readiness", f"{score}%"],
    ]

    summary_table = Table(
        summary_data,
        colWidths=[55 * mm, 115 * mm],
    )

    summary_table.setStyle(
        TableStyle(
            [
                (
                    "BACKGROUND",
                    (0, 0),
                    (0, -1),
                    colors.HexColor("#F1ECFF"),
                ),
                (
                    "BACKGROUND",
                    (1, 0),
                    (1, -1),
                    colors.HexColor("#FAF9FF"),
                ),
                (
                    "TEXTCOLOR",
                    (0, 0),
                    (0, -1),
                    colors.HexColor("#6D3FD6"),
                ),
                (
                    "TEXTCOLOR",
                    (1, 0),
                    (1, -1),
                    colors.HexColor("#222222"),
                ),
                (
                    "FONTNAME",
                    (0, 0),
                    (0, -1),
                    "Helvetica-Bold",
                ),
                (
                    "FONTNAME",
                    (1, 0),
                    (1, -1),
                    "Helvetica",
                ),
                (
                    "GRID",
                    (0, 0),
                    (-1, -1),
                    0.5,
                    colors.HexColor("#DDDDDD"),
                ),
                (
                    "PADDING",
                    (0, 0),
                    (-1, -1),
                    9,
                ),
            ]
        )
    )

    story.append(summary_table)
    story.append(Spacer(1, 20))

    story.append(
        Paragraph(
            "Career Readiness Analysis",
            heading_style,
        )
    )

    readiness_text = (
        f"You currently have a career readiness score of "
        f"<b>{score}%</b> for the <b>{career}</b> role. "
        f"The score is based on the skills detected from your resume "
        f"and compared against the skills required for the selected career."
    )

    story.append(Paragraph(readiness_text, normal_style))
    story.append(Spacer(1, 12))

    score_table = Table(
        [
            ["Metric", "Count"],
            ["Required Skills", str(len(required_skills))],
            ["Existing Skills", str(len(existing_skills))],
            ["Skills to Develop", str(len(missing_skills))],
        ],
        colWidths=[120 * mm, 50 * mm],
    )

    score_table.setStyle(
        TableStyle(
            [
                (
                    "BACKGROUND",
                    (0, 0),
                    (-1, 0),
                    colors.HexColor("#6D3FD6"),
                ),
                (
                    "TEXTCOLOR",
                    (0, 0),
                    (-1, 0),
                    colors.white,
                ),
                (
                    "FONTNAME",
                    (0, 0),
                    (-1, 0),
                    "Helvetica-Bold",
                ),
                (
                    "GRID",
                    (0, 0),
                    (-1, -1),
                    0.5,
                    colors.HexColor("#DDDDDD"),
                ),
                (
                    "PADDING",
                    (0, 0),
                    (-1, -1),
                    8,
                ),
            ]
        )
    )

    story.append(score_table)

    story.append(
        Paragraph(
            "Your Existing Skills",
            heading_style,
        )
    )

    if existing_skills:
        for skill in existing_skills:
            story.append(
                Paragraph(
                    f"✓ {skill}",
                    normal_style,
                )
            )
    else:
        story.append(
            Paragraph(
                "No matching skills were identified.",
                normal_style,
            )
        )

    story.append(
        Paragraph(
            "Skills You Need to Develop",
            heading_style,
        )
    )

    if missing_skills:
        for skill in missing_skills:
            story.append(
                Paragraph(
                    f"○ {skill}",
                    normal_style,
                )
            )
    else:
        story.append(
            Paragraph(
                "You currently match all required skills.",
                normal_style,
            )
        )

    story.append(
        Paragraph(
            "Required Skills",
            heading_style,
        )
    )

    required_text = ", ".join(required_skills)

    story.append(
        Paragraph(
            required_text,
            normal_style,
        )
    )

    story.append(PageBreak())

    story.append(
        Paragraph(
            "6-Month Career Roadmap",
            title_style,
        )
    )

    story.append(
        Paragraph(
            f"Personalized roadmap for becoming a "
            f"<b>{career}</b>",
            subtitle_style,
        )
    )

    months = roadmap.get("months", [])

    for month in months:
        month_name = month.get("month", "Month")

        story.append(
            Paragraph(
                month_name,
                heading_style,
            )
        )

        topics = month.get("topics", [])
        projects = month.get("projects", [])

        story.append(
            Paragraph(
                "<b>Topics to Learn</b>",
                normal_style,
            )
        )

        for topic in topics:
            story.append(
                Paragraph(
                    f"• {topic}",
                    normal_style,
                )
            )

        story.append(Spacer(1, 6))

        story.append(
            Paragraph(
                "<b>Projects</b>",
                normal_style,
            )
        )

        for project in projects:
            story.append(
                Paragraph(
                    f"• {project}",
                    normal_style,
                )
            )

        story.append(Spacer(1, 10))

    story.append(Spacer(1, 10))

    story.append(
        Paragraph(
            "Final Career Guidance",
            heading_style,
        )
    )

    final_message = (
        f"Focus first on the missing skills identified in this report. "
        f"Follow the roadmap consistently, build the recommended projects, "
        f"and update your resume as you gain new skills. "
        f"Your goal is to progressively increase your readiness for the "
        f"{career} role."
    )

    story.append(
        Paragraph(
            final_message,
            normal_style,
        )
    )

    story.append(Spacer(1, 20))

    story.append(
        Paragraph(
            "Generated by AI Career Copilot",
            small_style,
        )
    )

    doc.build(story)