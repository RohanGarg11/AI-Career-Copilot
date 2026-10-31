import { useState } from "react";

function Roadmap({
  selectedCareer,
  skillGapData,
  onRoadmapGenerated,
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const generateRoadmap = async () => {
    try {
      setLoading(true);
      setMessage("AI is creating your personalized roadmap...");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/generate-roadmap`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          career: selectedCareer,
          existing_skills: skillGapData.existing_skills,
          missing_skills: skillGapData.missing_skills,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        setMessage(data.detail || "Failed to generate roadmap.");
        return;
      }

      console.log("Generated Roadmap:", data);

      onRoadmapGenerated(data);
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
      <h2>Personalized Career Roadmap</h2>

      <p className="card-description">
        Let AI create a personalized 6-month learning plan for your target
        career based on your current skills and skill gaps.
      </p>

      <div className="roadmap-intro">
        <h3>{selectedCareer}</h3>

        <p
          style={{
            color: "#64748b",
            marginTop: "8px",
            marginBottom: "0",
          }}
        >
          AI will prioritize the skills you are currently missing and
          recommend practical projects to help you become career-ready.
        </p>
      </div>

      <button
        className="primary-button"
        onClick={generateRoadmap}
        disabled={loading}
      >
        {loading ? "Generating Roadmap..." : "Generate 6-Month Roadmap"}
      </button>

      {message && <p className="status-message">{message}</p>}
    </section>
  );
}

export default Roadmap;