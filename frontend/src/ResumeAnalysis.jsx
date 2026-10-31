function ResumeAnalysis({ resumeData }) {
  const analysis = resumeData?.analysis;

  if (!analysis) {
    return null;
  }

  const renderList = (items) => {
    if (!items || items.length === 0) {
      return <p className="empty-state">None detected</p>;
    }

    return (
      <div className="skill-list">
        {items.map((item, index) => (
          <span className="skill skill-required" key={index}>
            {item}
          </span>
        ))}
      </div>
    );
  };

  return (
    <section className="card">
      <h2>Resume Analysis</h2>

      <p className="card-description">
        AI-extracted information from your resume.
      </p>

      <div className="grid">
        <div>
          <h3>Name</h3>
          <p>{analysis.name || "Not detected"}</p>
        </div>

        <div>
          <h3>Education</h3>
          {renderList(analysis.education)}
        </div>

        <div>
          <h3>Skills</h3>
          {renderList(analysis.skills)}
        </div>

        <div>
          <h3>Programming Languages</h3>
          {renderList(analysis.programming_languages)}
        </div>

        <div>
          <h3>Projects</h3>
          {renderList(analysis.projects)}
        </div>

        <div>
          <h3>Experience</h3>
          {renderList(analysis.experience)}
        </div>

        <div>
          <h3>Certifications</h3>
          {renderList(analysis.certifications)}
        </div>

        <div>
          <h3>Tools & Technologies</h3>
          {renderList(analysis.tools)}
        </div>
      </div>
    </section>
  );
}

export default ResumeAnalysis;