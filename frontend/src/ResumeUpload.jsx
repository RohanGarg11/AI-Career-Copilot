import { useState } from "react";

function ResumeUpload({ onResumeUploaded }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a resume PDF first.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/analyze-resume`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to analyze resume.");
      }

      const data = await response.json();

      onResumeUploaded(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-card">
      <div className="upload-icon">↑</div>

      <h2>Upload Your Resume</h2>

      <p>
        Upload your resume in PDF format and let AI analyze
        your skills and experience.
      </p>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {file && (
        <p className="selected-file">
          Selected: {file.name}
        </p>
      )}

      {error && <p className="error-message">{error}</p>}

      <button
        className="primary-button"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Analyzing Resume..." : "Analyze Resume"}
      </button>
    </div>
  );
}

export default ResumeUpload;