from career_data import CAREERS


SKILL_ALIASES = {
    "python programming": "python",
    "python programming language": "python",
    "cpp": "c++",
    "c plus plus": "c++",
    "c++ programming": "c++",
    "javascript programming": "javascript",
    "js": "javascript",
    "typescript programming": "typescript",
    "ts": "typescript",
    "machine learning using python": "machine learning",
    "ml": "machine learning",
    "deep learning using python": "deep learning",
    "dl": "deep learning",
    "scikit learn": "machine learning",
    "sklearn": "machine learning",
    "pytorch": "deep learning",
    "tensorflow": "deep learning",
    "postgresql": "sql",
    "mysql": "sql",
    "git github": "git",
}


def normalize_skill(skill):
    skill = skill.strip().lower()

    skill = skill.replace("-", " ")
    skill = skill.replace("_", " ")

    skill = " ".join(skill.split())

    return SKILL_ALIASES.get(skill, skill)


def skill_matches(student_skill, required_skill):
    student = normalize_skill(student_skill)
    required = normalize_skill(required_skill)

    if student == required:
        return True

    if required in student:
        return True

    if student in required:
        return True

    return False


def analyze_career(student_skills, target_career):
    if target_career not in CAREERS:
        raise ValueError("Career not found")

    required_skills = CAREERS[target_career]

    existing_skills = []
    missing_skills = []

    for required_skill in required_skills:

        found = False

        for student_skill in student_skills:

            if skill_matches(
                student_skill,
                required_skill
            ):
                found = True
                break

        if found:
            existing_skills.append(required_skill)
        else:
            missing_skills.append(required_skill)

    total_skills = len(required_skills)

    if total_skills == 0:
        score = 0
    else:
        score = int(
            len(existing_skills)
            / total_skills
            * 100
        )

    return {
        "career": target_career,
        "required_skills": required_skills,
        "existing_skills": existing_skills,
        "missing_skills": missing_skills,
        "score": score,
    }