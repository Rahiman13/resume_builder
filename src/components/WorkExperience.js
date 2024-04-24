import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // State for Personal Information
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    website: '',
    summary: ''
  });

  // State for Education
  const [education, setEducation] = useState([
    { id: 1, school: '', CGPA: '', gradYear: '', specialization: '', placeholderText: '10th' }
  ]);

  // State for Work Experience
  const [workExperience, setWorkExperience] = useState([]);

  // State for Skills
  const [skills, setSkills] = useState([]);

  // State for Certifications
  const [certifications, setCertifications] = useState([]);

  // State for Projects
  const [projects, setProjects] = useState([]);

  // State for showing preview
  const [showPreview, setShowPreview] = useState(false);

  // Effect to load data from local storage on mount
  useEffect(() => {
    const storedData = localStorage.getItem('resumeData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setPersonalInfo(parsedData.personalInfo || {});
      setEducation(parsedData.education || []);
      setWorkExperience(parsedData.workExperience || []);
      setSkills(parsedData.skills || []);
      setCertifications(parsedData.certifications || []);
      setProjects(parsedData.projects || []);
    }
  }, []);

  // Function to handle form submission
  const handleSubmit = () => {
    const resumeData = {
      personalInfo,
      education,
      workExperience,
      skills,
      certifications,
      projects
    };
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    setShowPreview(true);
  };

  // Function to handle updating
  const handleUpdate = () => {
    setShowPreview(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Function to handle adding education
  const addEducation = () => {
    const newId = education.length + 1;
    if (newId <= 4) {
      let placeholderText;
      switch (newId) {
        case 1:
          placeholderText = '10th';
          break;
        case 2:
          placeholderText = 'Intermediate';
          break;
        case 3:
          placeholderText = 'Under Graduation';
          break;
        case 4:
          placeholderText = 'Post Graduation';
          break;
        default:
          placeholderText = '';
      }
      setEducation([...education, { id: newId, school: '', CGPA: '', gradYear: '', specialization: '', placeholderText }]);
    }
  };

  // Function to handle input change for education
  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  // Function to handle adding work experience
  const addWorkExperience = () => {
    const newId = workExperience.length + 1;
    if (newId <= 4) {
      setWorkExperience([...workExperience, { id: newId, company: '', position: '', startDate: '', endDate: '' }]);
    }
  };

  // Function to handle input change for work experience
  const handleWorkExperienceChange = (index, field, value) => {
    const updatedWorkExperience = [...workExperience];
    updatedWorkExperience[index][field] = value;
    setWorkExperience(updatedWorkExperience);
  };

  // Function to handle adding skills
  // Similar functions for certifications and projects

  return (
    <div className="App">
      <h1>Resume Builder</h1>
      {!showPreview && (
        <>
          {/* Personal Information */}
          {/* Education */}
          {/* Work Experience */}
          {/* Skills */}
          {/* Certifications */}
          {/* Projects */}
          {/* Buttons for submission and updating */}
        </>
      )}

      {/* Preview */}
      {showPreview && (
        <>
          {/* Preview content */}
          <button onClick={handleUpdate}>Update</button>
        </>
      )}
    </div>
  );
}

export default App;
