import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file

// Functions to handle adding and removing entries for education, skills, achievements, and certificates
const addEducation = (education, setEducation) => {
  setEducation([...education, { degree: '', institution: '', year: '' }]);
};

const removeEducation = (index, education, setEducation) => {
  const updatedEducation = [...education];
  updatedEducation.splice(index, 1);
  setEducation(updatedEducation);
};

const addSkill = (skills, setSkills) => {
  setSkills([...skills, '']);
};

const removeSkill = (index, skills, setSkills) => {
  const updatedSkills = [...skills];
  updatedSkills.splice(index, 1);
  setSkills(updatedSkills);
};

const addAchievement = (achievements, setAchievements) => {
  setAchievements([...achievements, '']);
};

const removeAchievement = (index, achievements, setAchievements) => {
  const updatedAchievements = [...achievements];
  updatedAchievements.splice(index, 1);
  setAchievements(updatedAchievements);
};

const addCertificate = (certificates, setCertificates) => {
  setCertificates([...certificates, { name: '', issuer: '', date: '' }]);
};

const removeCertificate = (index, certificates, setCertificates) => {
  const updatedCertificates = [...certificates];
  updatedCertificates.splice(index, 1);
  setCertificates(updatedCertificates);
};

// Main App Component
function ResumeBuilder() {
  // State to store user input for each section of the resume
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    image: ''
  });
  const [objective, setObjective] = useState('');
  const [education, setEducation] = useState([{ degree: '', institution: '', year: '' }]);
  const [skills, setSkills] = useState(['']);
  const [achievements, setAchievements] = useState(['']);
  const [certificates, setCertificates] = useState([{ name: '', issuer: '', date: '' }]);
  const [resumeTemplate, setResumeTemplate] = useState('');

  // Load data from local storage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem('resumeData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setPersonalInfo(parsedData.personalInfo);
      setObjective(parsedData.objective);
      setEducation(parsedData.education);
      setSkills(parsedData.skills);
      setAchievements(parsedData.achievements);
      setCertificates(parsedData.certificates);
    }
  }, []);

  // Update local storage whenever state changes
  useEffect(() => {
    const dataToStore = {
      personalInfo,
      objective,
      education,
      skills,
      achievements,
      certificates
    };
    localStorage.setItem('resumeData', JSON.stringify(dataToStore));
  }, [personalInfo, objective, education, skills, achievements, certificates]);

  // Function to generate the resume template
  const generateResumeTemplate = () => {
    const template = `
      <div class="resume">
        <div class="personal-column">
          <h2>Personal Information</h2>
          <img src="${personalInfo.image}" alt="User Image" /> <!-- Display image in template -->
          <p>Name: ${personalInfo.name}</p>
          <p>Email: ${personalInfo.email}</p>
          <p>Phone: ${personalInfo.phone}</p>
          <p>Address: ${personalInfo.address}</p>
          <h2>Skills</h2>
          <ul>
            ${skills.map(skill => `<li>${skill}</li>`).join('')}
          </ul>
        </div>
        <div class="details-column">
          <h2>Objective</h2>
          <p>${objective}</p>
          <h2>Education</h2>
          ${education.map(edu => (
            `<p>${edu.degree} - ${edu.institution}, ${edu.year}</p>`
          )).join('')}
          <h2>Achievements</h2>
          <ul>
            ${achievements.map(achievement => `<li>${achievement}</li>`).join('')}
          </ul>
          <h2>Certificates</h2>
          ${certificates.map(cert => (
            `<p>${cert.name} - ${cert.issuer}, ${cert.date}</p>`
          )).join('')}
        </div>
      </div>
    `;
    setResumeTemplate(template);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    generateResumeTemplate();
  };

  return (
    <div className="container">
      <h1>Resume Builder</h1>
      <form onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            className="input-field"
            value={personalInfo.name}
            onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            className="input-field"
            value={personalInfo.email}
            onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            className="input-field"
            value={personalInfo.phone}
            onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            className="input-field"
            value={personalInfo.address}
            onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
          />
        </div>
        {/* Image Upload */}
        <div className="form-group">
          <label>Image:</label>
          <input
            type="text"
            className="input-field"
            value={personalInfo.image}
            onChange={(e) => setPersonalInfo({ ...personalInfo, image: e.target.value })}
            placeholder="Enter Image URL"
          />
        </div>
        {/* Objective Section */}
        <div className="form-group">
          <label>Objective:</label>
          <textarea
            className="textarea-field"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
          ></textarea>
        </div>

        {/* Education Section */}
        <div className="form-group">
          <label>Education:</label>
          {education.map((edu, index) => (
            <div key={index} className="education-field">
              <input
                type="text"
                className="input-field"
                value={edu.degree}
                onChange={(e) => {
                  const updatedEducation = [...education];
                  updatedEducation[index].degree = e.target.value;
                  setEducation(updatedEducation);
                }}
                placeholder="Degree"
              />
              <input
                type="text"
                className="input-field"
                value={edu.institution}
                onChange={(e) => {
                  const updatedEducation = [...education];
                  updatedEducation[index].institution = e.target.value;
                  setEducation(updatedEducation);
                }}
                placeholder="Institution"
              />
              <input
                type="text"
                className="input-field"
                value={edu.year}
                onChange={(e) => {
                  const updatedEducation = [...education];
                  updatedEducation[index].year = e.target.value;
                  setEducation(updatedEducation);
                }}
                placeholder="Year"
              />
              {index > 0 && (
                <button type="button" className="add-remove-button" onClick={() => removeEducation(index)}>Remove</button>
              )}
            </div>
          ))}
          <button type="button" className="add-remove-button" onClick={() => addEducation(education, setEducation)}>Add Education</button>
        </div>

        {/* Skills Section */}
        <div className="form-group">
          <label>Skills:</label>
          {skills.map((skill, index) => (
            <div key={index} className="skills-field">
              <input
                type="text"
                className="input-field"
                value={skill}
                onChange={(e) => {
                  const updatedSkills = [...skills];
                  updatedSkills[index] = e.target.value;
                  setSkills(updatedSkills);
                }}
              />
              {index > 0 && (
                <button type="button" className="add-remove-button" onClick={() => removeSkill(index, skills, setSkills)}>Remove</button>
              )}
            </div>
          ))}
          <button type="button" className="add-remove-button" onClick={() => addSkill(skills, setSkills)}>Add Skill</button>
        </div>

        {/* Achievements Section */}
        <div className="form-group">
          <label>Achievements:</label>
          {achievements.map((achievement, index) => (
            <div key={index} className="achievements-field">
              <input
                type="text"
                className="input-field"
                value={achievement}
                onChange={(e) => {
                  const updatedAchievements = [...achievements];
                  updatedAchievements[index] = e.target.value;
                  setAchievements(updatedAchievements);
                }}
              />
              {index > 0 && (
                <button type="button" className="add-remove-button" onClick={() => removeAchievement(index, achievements, setAchievements)}>Remove</button>
              )}
            </div>
          ))}
          <button type="button" className="add-remove-button" onClick={() => addAchievement(achievements, setAchievements)}>Add Achievement</button>
        </div>

        {/* Certificates Section */}
        <div className="form-group">
          <label>Certificates:</label>
          {certificates.map((certificate, index) => (
            <div key={index} className="certificates-field">
              <input
                type="text"
                className="input-field"
                value={certificate.name}
                onChange={(e) => {
                  const updatedCertificates = [...certificates];
                  updatedCertificates[index].name = e.target.value;
                  setCertificates(updatedCertificates);
                }}
                placeholder="Name"
              />
              <input
                type="text"
                className="input-field"
                value={certificate.issuer}
                onChange={(e) => {
                  const updatedCertificates = [...certificates];
                  updatedCertificates[index].issuer = e.target.value;
                  setCertificates(updatedCertificates);
                }}
                placeholder="Issuer"
              />
              <input
                type="text"
                className="input-field"
                value={certificate.date}
                onChange={(e) => {
                  const updatedCertificates = [...certificates];
                  updatedCertificates[index].date = e.target.value;
                  setCertificates(updatedCertificates);
                }}
                placeholder="Date"
              />
              {index > 0 && (
                <button type="button" className="add-remove-button" onClick={() => removeCertificate(index, certificates, setCertificates)}>Remove</button>
              )}
            </div>
          ))}
          <button type="button" className="add-remove-button" onClick={() => addCertificate(certificates, setCertificates)}>Add Certificate</button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="generate-button">Generate Resume</button>
      </form>

      {/* Display the generated resume template */}
      {resumeTemplate && (
        <div className="resume-template">
          <h2>Resume Template</h2>
          <div dangerouslySetInnerHTML={{ __html: resumeTemplate }}></div>
        </div>
      )}
    </div>
  );
}

export default ResumeBuilder;
