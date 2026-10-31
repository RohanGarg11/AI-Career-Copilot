const careers = [
  "Software Engineer",
  "Machine Learning Engineer",
  "Data Scientist",
  "Product Manager",
];

function CareerSelection({ selectedCareer, setSelectedCareer }) {
  return (
    <section className="card">
      <h2>Choose Your Target Career</h2>

      <p className="card-description">
        Select the career you want to prepare for. We'll compare your current
        skills with the skills required for that role.
      </p>

      <select
        className="select-input"
        value={selectedCareer}
        onChange={(event) => setSelectedCareer(event.target.value)}
      >
        <option value="">Select a career</option>

        {careers.map((career) => (
          <option key={career} value={career}>
            {career}
          </option>
        ))}
      </select>

     {selectedCareer && (
  <div className="target-career">
    <span className="target-career-label">
      TARGET CAREER
    </span>

    <span className="target-career-name">
      {selectedCareer}
    </span>
  </div>
)}
    </section>
  );
}

export default CareerSelection;