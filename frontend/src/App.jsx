import { useState } from "react";

import ResumeUpload from "./ResumeUpload";
import ResumeAnalysis from "./ResumeAnalysis";
import CareerSelection from "./CareerSelection";
import SkillGap from "./SkillGap";
import Roadmap from "./Roadmap";
import Dashboard from "./Dashboard";

function App() {
  const [resumeData, setResumeData] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState("");
  const [skillGapData, setSkillGapData] = useState(null);
  const [roadmapData, setRoadmapData] = useState(null);

  const handleResumeUploaded = (data) => {
    setResumeData(data);
    setSelectedCareer("");
    setSkillGapData(null);
    setRoadmapData(null);
  };

  const handleCareerChange = (career) => {
    setSelectedCareer(career);
    setSkillGapData(null);
    setRoadmapData(null);
  };

  const handleSkillGapGenerated = (data) => {
    setSkillGapData(data);
    setRoadmapData(null);
  };

  const handleRoadmapGenerated = (data) => {
    setRoadmapData(data);
  };

  const resetApp = () => {
    setResumeData(null);
    setSelectedCareer("");
    setSkillGapData(null);
    setRoadmapData(null);
  };

  return (
    <div className="app-container">
     <nav className="navbar">
  <div className="brand">
    <div className="brand-mark">✦</div>

    <div>
      <div className="logo">AI Career Copilot</div>
      <div className="brand-tagline">
        Career intelligence platform
      </div>
    </div>
  </div>

  <div className="navbar-status">
    <span className="status-dot"></span>
    AI Powered
  </div>
</nav>

      {!resumeData ? (
        <>
          <section className="hero">
  <div className="hero-badge">
    <span>✦</span>
    AI-POWERED CAREER INTELLIGENCE
  </div>

  <h1>
    Build Your
    <br />
    <span>Career Roadmap</span>
    <br />
    With AI
  </h1>

  <p>
    Upload your resume, uncover your skill gaps, and get a
    personalized roadmap designed around your career goals.
  </p>

  <div className="hero-features">
    <span>Resume Intelligence</span>
    <span>Skill Gap Analysis</span>
    <span>AI Roadmaps</span>
  </div>
</section>

          <main className="container">
            <ResumeUpload onResumeUploaded={handleResumeUploaded} />
          </main>
        </>
      ) : (
        <main className="container">
          <div className="dashboard-header">
            <h1>Your Career Analysis</h1>
            <p>
              Here's your personalized career analysis based on your resume.
            </p>
          </div>

          <ResumeAnalysis resumeData={resumeData} />

          <CareerSelection
            selectedCareer={selectedCareer}
            setSelectedCareer={handleCareerChange}
          />

          {selectedCareer && (
            <SkillGap
              selectedCareer={selectedCareer}
              resumeData={resumeData}
              skillGapData={skillGapData}
              onSkillGapGenerated={handleSkillGapGenerated}
            />
          )}

          {skillGapData && (
            <Roadmap
              selectedCareer={selectedCareer}
              skillGapData={skillGapData}
              onRoadmapGenerated={handleRoadmapGenerated}
            />
          )}

          {roadmapData && (
            <Dashboard
              resumeData={resumeData}
              selectedCareer={selectedCareer}
              skillGapData={skillGapData}
              roadmapData={roadmapData}
            />
          )}

          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <button className="secondary-button" onClick={resetApp}>
              Analyze Another Resume
            </button>
          </div>
        </main>
      )}

      <footer className="footer">
        AI Career Copilot • Personalized career planning with AI
      </footer>
    </div>
  );
}

export default App;