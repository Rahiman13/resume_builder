import React, { useState, useEffect } from 'react';

const Skills = ({ skills, setSkills }) => {
    const [selectedSkill, setSelectedSkill] = useState('');

    useEffect(() => {
        const storedSkills = localStorage.getItem('skills');
        if (storedSkills) {
            setSkills(JSON.parse(storedSkills));
        }
    }, []); // Load skills from local storage on component mount

    useEffect(() => {
        localStorage.setItem('skills', JSON.stringify(skills));
    }, [skills]); // Update local storage when skills change

    const skillOptions = [
        'JavaScript',
        'React',
        'Node.js',
        'Python',
        'Java',
        'HTML',
        'CSS',
        'SQL',
        'Git',
        'Machine Learning',
        'Data Analysis',
        'Project Management',
        'Communication',
        'Leadership',
        // Add more skills as needed
    ];

    const handleSelectSkill = (skill) => {
        setSelectedSkill(skill);
        setSkills([...skills, skill]);
    };

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    return (
        <div>
            <h2>Skills</h2>
            <select value={selectedSkill} className='input' onChange={(e) => handleSelectSkill(e.target.value)}>
                <option value="" disabled>Select Skill</option>
                {skillOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
            <ul>
                {skills.map((skill, index) => (
                    <li key={index}>
                        {skill}
                        <span onClick={() => removeSkill(skill)} style={{ cursor: 'pointer', marginLeft: '5px' }}>×</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Skills;
