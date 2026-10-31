import { useState } from "react";
function Dashboard({
  resumeData,
  selectedCareer,
  skillGapData,
  roadmapData,
}) {
  const [downloading, setDownloading] = useState(false);
  const downloadReport = async () => {
  try {
    setDownloading(true);

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/generate-report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_name: resumeData?.analysis?.name || "Student",
        career: selectedCareer,
        score: skillGapData.score,
        existing_skills: skillGapData.existing_skills,
        missing_skills: skillGapData.missing_skills,
        required_skills: skillGapData.required_skills,
        roadmap: roadmapData,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate report");
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "AI_Career_Copilot_Report.pdf";

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    alert("Could not generate the career report.");
  } finally {
    setDownloading(false);
  }
};
  const analysis = resumeData?.analysis;

  if (!roadmapData || !skillGapData) {
    return null;
  }

  const months = roadmapData.months || [];

  return (
    <section className="card">
      <div className="dashboard-header">
        <h2>Career Development Dashboard</h2>
        <button
  className="download-report-button"
  onClick={downloadReport}
  disabled={downloading}
>
  {downloading
    ? "Generating Report..."
    : "↓ Download Career Report"}
</button>

        <p>
          Your personalized career plan for becoming a{" "}
          <strong>{selectedCareer}</strong>.
        </p>
      </div>

      <div className="dashboard-summary">
        <div className="summary-card">
          <div className="summary-icon">🎯</div>

          <div>
            <h3>Target Career</h3>
            <p>{selectedCareer}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">📊</div>

          <div>
            <h3>Readiness Score</h3>
            <p>{skillGapData.score}%</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">📚</div>

          <div>
            <h3>Skills to Learn</h3>
            <p>{skillGapData.missing_skills.length}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">🚀</div>

          <div>
            <h3>Roadmap Duration</h3>
            <p>6 Months</p>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Career Readiness</h2>

        <div className="readiness-container">
          <div
  className="score-gauge large"
  style={{
    "--score": `${skillGapData.score * 3.6}deg`,
  }}
>
  <div className="score-gauge-inner">
    <div className="score-number">
      {skillGapData.score}%
    </div>

    <div className="score-label">
      Career Ready
    </div>
  </div>
</div>

          <div className="readiness-content">
            <h3>
              {analysis?.name
                ? `${analysis.name}, here's your progress`
                : "Here's your current progress"}
            </h3>

            <p>
              You currently have{" "}
              <strong>
                {skillGapData.existing_skills.length}
              </strong>{" "}
              of{" "}
              <strong>
                {skillGapData.required_skills.length}
              </strong>{" "}
              required skills for your target career.
            </p>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${skillGapData.score}%`,
                }}
              ></div>
            </div>

            <p className="progress-text">
              {skillGapData.score >= 80
                ? "Excellent progress! Focus on strengthening your remaining skills."
                : skillGapData.score >= 60
                ? "Good progress! Continue working on your missing skills."
                : skillGapData.score >= 40
                ? "You have a solid foundation. Follow the roadmap consistently."
                : "You are at the beginning of your journey. Start with the roadmap and build your foundation."}
            </p>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Skills Overview</h2>

        <div className="skills-overview">
          <div className="skills-column">
            <h3>✓ Skills You Have</h3>

            <div className="skill-list">
              {skillGapData.existing_skills.length > 0 ? (
                skillGapData.existing_skills.map((skill, index) => (
                  <span
                    className="skill skill-existing"
                    key={index}
                  >
                    ✓ {skill}
                  </span>
                ))
              ) : (
                <p>No matching skills detected.</p>
              )}
            </div>
          </div>

          <div className="skills-column">
            <h3>○ Skills To Develop</h3>

            <div className="skill-list">
              {skillGapData.missing_skills.length > 0 ? (
                skillGapData.missing_skills.map((skill, index) => (
                  <span
                    className="skill skill-missing"
                    key={index}
                  >
                    + {skill}
                  </span>
                ))
              ) : (
                <p>
                  🎉 You already have all the required skills!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>6-Month Learning Roadmap</h2>

        <p className="card-description">
          Follow this roadmap step by step to close your skill gaps
          and prepare for your target career.
        </p>

        <div className="roadmap-timeline">
          {months.map((month, index) => (
            <div className="roadmap-month" key={index}>
              <div className="roadmap-number">
                {index + 1}
              </div>

              <div className="roadmap-content">
                <div className="roadmap-title">
                  <h3>
                    {month.month || `Month ${index + 1}`}
                  </h3>

                  <span className="month-badge">
                    Month {index + 1}
                  </span>
                </div>

                <div className="roadmap-block">
                  <h4>📚 Topics</h4>

                  {month.topics?.length > 0 ? (
                    <ul>
                      {month.topics.map((topic, topicIndex) => (
                        <li key={topicIndex}>{topic}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No topics specified.</p>
                  )}
                </div>

                <div className="roadmap-block">
                  <h4>💻 Projects</h4>

                  {month.projects?.length > 0 ? (
                    <ul>
                      {month.projects.map((project, projectIndex) => (
                        <li key={projectIndex}>{project}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No projects specified.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-section final-message">
        <div className="final-icon">🚀</div>

        <h2>Your Career Journey Starts Here</h2>

        <p>
          Stay consistent, build the recommended projects, and
          continuously improve your skills. Your roadmap is designed
          to take you from your current level toward your target
          career.
        </p>
      </div>
    </section>
  );
}

export default Dashboard;

