import { useState } from "react";

function SkillGap({
  selectedCareer,
  resumeData,
  skillGapData,
  onSkillGapGenerated,
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const generateSkillGap = async () => {
    const analysis = resumeData?.analysis;

    if (!analysis) {
      setMessage("Resume analysis is not available.");
      return;
    }

    const skills = [
      ...(analysis.skills || []),
      ...(analysis.programming_languages || []),
      ...(analysis.tools || []),
    ];

    const uniqueSkills = [
      ...new Set(
        skills
          .filter((skill) => skill && skill.trim())
          .map((skill) => skill.trim())
      ),
    ];

    if (uniqueSkills.length === 0) {
      setMessage("No technical skills were detected in your resume.");
      return;
    }

    console.log("Skills sent for skill-gap analysis:", uniqueSkills);

    try {
      setLoading(true);
      setMessage("Analyzing your complete technical profile...");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/skill-gap`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skills: uniqueSkills,
          career: selectedCareer,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        setMessage(data.detail || "Failed to generate skill gap.");
        return;
      }

      onSkillGapGenerated(data);
      setMessage("");
    } catch (error) {
      console.error(error);
      setMessage("Could not connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h2>Career Skill Gap</h2>

      <p className="card-description">
        We'll compare your programming languages, technical skills,
        tools, and technologies against the requirements for{" "}
        <strong>{selectedCareer}</strong>.
      </p>

      {!skillGapData && (
        <button
          className="primary-button"
          onClick={generateSkillGap}
          disabled={loading}
        >
          {loading
            ? "Analyzing Complete Profile..."
            : "Analyze Skill Gap"}
        </button>
      )}

      {message && <p className="status-message">{message}</p>}

      {skillGapData && (
        <div style={{ marginTop: "28px" }}>
          <div className="skill-gap-score">
            <div
  className="score-gauge"
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

            <div>
              <h3>Career Readiness Score</h3>

              <p
                style={{
                  color: "#a4aab8",
                  marginTop: "8px",
                }}
              >
                Your score is based on your programming languages,
                technical skills, tools, and technologies.
              </p>
            </div>
          </div>

          <div className="skill-gap-columns">
           <div className="skill-gap-panel existing">
    <h3 style={{ marginBottom: "12px" }}>
      Skills You Have
    </h3>

              {skillGapData.existing_skills.length > 0 ? (
                <div className="skill-list">
                  {skillGapData.existing_skills.map(
                    (skill, index) => (
                      <span
                        className="skill skill-existing"
                        key={index}
                      >
                        ✓ {skill}
                      </span>
                    )
                  )}
                </div>
              ) : (
                <p style={{ color: "#737b8c" }}>
                  No matching skills found.
                </p>
              )}
            </div>

            <div className="skill-gap-panel missing">
    <h3 style={{ marginBottom: "12px" }}>
      Skills You Need
    </h3>


              {skillGapData.missing_skills.length > 0 ? (
                <div className="skill-list">
                  {skillGapData.missing_skills.map(
                    (skill, index) => (
                      <span
                        className="skill skill-missing"
                        key={index}
                      >
                        + {skill}
                      </span>
                    )
                  )}
                </div>
              ) : (
                <p style={{ color: "#34d399" }}>
                  🎉 You have all the required skills!
                </p>
              )}
            </div>
          </div>

          <div className="required-skills-section">
            <h3 style={{ marginBottom: "12px" }}>
              All Required Skills
            </h3>

            <div className="skill-list">
              {skillGapData.required_skills.map(
                (skill, index) => {
                  const isExisting =
                    skillGapData.existing_skills.includes(
                      skill
                    );

                  return (
                    <span
                      className={`skill ${
                        isExisting
                          ? "skill-existing"
                          : "skill-missing"
                      }`}
                      key={index}
                    >
                      {isExisting ? "✓" : "○"} {skill}
                    </span>
                  );
                }
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default SkillGap;