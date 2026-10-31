from ai_service import analyze_resume

resume = """
Rohan Garg

B.Tech Computer Science Engineering

Skills:
C++, Python, SQL, Machine Learning, Data Structures and Algorithms

Projects:
AI Career Copilot
Machine Learning Prediction System

Education:
B.Tech Computer Science Engineering

Certifications:
Python Programming
"""

try:
    result = analyze_resume(resume)

    print("SUCCESS!")
    print(result)

except Exception as e:
    print("ERROR TYPE:", type(e).__name__)
    print("ERROR:", e)