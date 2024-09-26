import React, { useState } from 'react';
import './App.css';

function App() {
  const [professionalSummary, setProfessionalSummary] = useState('');
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState([]);
  const [careerObjective, setCareerObjective] = useState('');
  const [experience, setExperience] = useState('');
  const [achievements, setAchievements] = useState('');
  const [degree, setDegree] = useState('');
  const [field, setField] = useState('');

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSkills([...skills, value]);
    } else {
      setSkills(skills.filter((skill) => skill !== value));
    }
  };

  return (
    <div className="resume-builder">
      <h1>Resume Builder</h1>
      <div className="section">
        <h2>Professional Summary</h2>
        <textarea
          value={professionalSummary}
          onChange={(e) => setProfessionalSummary(e.target.value)}
          placeholder="Enter your professional summary"
        />
      </div>
      <div className="section">
        <h2>Education Qualifications</h2>
        <select value={degree} onChange={(e) => setDegree(e.target.value)}>
          <option value="">Select Degree</option>
          <option value="Bachelor's">Bachelor's</option>
          <option value="Master's">Master's</option>
          <option value="PhD">PhD</option>
        </select>
        <select value={field} onChange={(e) => setField(e.target.value)}>
          <option value="">Select Field of Study</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Engineering">Engineering</option>
          <option value="Business">Business</option>
          <option value="Arts">Arts</option>
        </select>
        <textarea
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          placeholder="Enter your education qualifications"
        />
      </div>
      <div className="section">
        <h2>Academic and Non-Academic Skills</h2>
        <label>
          <input
            type="checkbox"
            value="JavaScript"
            onChange={handleSkillChange}
          />
          JavaScript
        </label>
        <label>
          <input
            type="checkbox"
            value="React"
            onChange={handleSkillChange}
          />
          React
        </label>
        <label>
          <input
            type="checkbox"
            value="Node.js"
            onChange={handleSkillChange}
          />
          Node.js
        </label>
        <label>
          <input
            type="checkbox"
            value="Python"
            onChange={handleSkillChange}
          />
          Python
        </label>
        <textarea
          value={skills.join(', ')}
          readOnly
          placeholder="Selected skills will appear here"
        />
      </div>
      <div className="section">
        <h2>Career Objective</h2>
        <textarea
          value={careerObjective}
          onChange={(e) => setCareerObjective(e.target.value)}
          placeholder="Enter your career objective"
        />
      </div>
      <div className="section">
        <h2>Experience and Internships</h2>
        <textarea
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="Enter your experience and internships"
        />
      </div>
      <div className="section">
        <h2>Skills and Achievements</h2>
        <textarea
          value={achievements}
          onChange={(e) => setAchievements(e.target.value)}
          placeholder="Enter your skills and achievements"
        />
      </div>
    </div>
  );
}

export default App;