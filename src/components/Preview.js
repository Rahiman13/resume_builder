import React from 'react';

const Preview = ({ resumeData, handleUpdate }) => {
  const scrollToPersonalInfo = () => {
    const personalInfoSection = document.getElementById('personal-info-section');
    if (personalInfoSection) {
      personalInfoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!resumeData) {
    return <div>No resume data found.</div>;
  }

  const { personalInfo, education, workExperience, skills, certifications, projects } = resumeData;

  // Check if education data exists
  const isEducationAvailable = education && education.length > 0;

  return (
    <div>
      <h2>Preview</h2>
      <h3>Personal Information</h3>
      <p>Name: {personalInfo.fullName}</p>
      <p>Email: {personalInfo.email}</p>
      <p>Phone: {personalInfo.phone}</p>
      <p>LinkedIn: {personalInfo.linkedin}</p>
      <p>Website: {personalInfo.website}</p>
      <p>Summary/Objective: {personalInfo.summary}</p>

      <h3 id="personal-info-section">Education</h3>
      {isEducationAvailable ? (
        <ul>
          {education.map((edu, index) => (
            <li key={index}>
              {edu.degree} in {edu.specialization} from {edu.school}, {edu.gradYear}
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p>No education data found. Please go back to the form and enter your education information.</p>
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}

      <h3>Work Experience</h3>
      <ul>
        {workExperience.map((exp, index) => (
          <li key={index}>
            {exp.jobTitle} at {exp.company} ({exp.startDate} - {exp.endDate})
          </li>
        ))}
      </ul>

      <h3>Skills</h3>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

      <h3>Certifications</h3>
      <ul>
        {certifications.map((cert, index) => (
          <li key={index}>{cert}</li>
        ))}
      </ul>

      <h3>Projects</h3>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <h4>{project.title}</h4>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>

      {!isEducationAvailable && <button onClick={handleUpdate}>Update</button>}
    </div>
  );
};

export default Preview;
