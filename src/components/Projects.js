import React, { useState, useEffect } from 'react';

const Projects = ({ projects, setProjects }) => {
    const [project, setProject] = useState({ title: '', description: '' });

    useEffect(() => {
        const storedProjects = localStorage.getItem('projects');
        if (storedProjects) {
            setProjects(JSON.parse(storedProjects));
        }
    }, []); // Load projects from local storage on component mount

    useEffect(() => {
        localStorage.setItem('projects', JSON.stringify(projects));
    }, [projects]); // Update local storage when projects change

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedProjects = [...projects];
        updatedProjects[index][name] = value;
        setProjects(updatedProjects);
    };

    const addProject = () => {
        setProjects([...projects, { title: '', description: '' }]);
    };

    const removeProject = (index) => {
        const updatedProjects = [...projects];
        updatedProjects.splice(index, 1);
        setProjects(updatedProjects);
    };

    return (
        <div>
            <h2>Projects</h2>
            {projects.map((project, index) => (
                <div key={index}>
                    <label htmlFor={`title${index}`}>Title:</label>
                    <input
                        type="text"
                        id={`title${index}`}
                        name={`title${index}`}
                        value={project.title}
                        onChange={(e) => handleInputChange(e, index)}
                    />
                    <label htmlFor={`description${index}`}>Description:</label>
                    <textarea
                        id={`description${index}`}
                        name={`description${index}`}
                        value={project.description}
                        class="input"
                        onChange={(e) => handleInputChange(e, index)}
                        rows="4"
                    />
                    {/* <span className="close" onClick={() => removeProject(index)}>&times;</span> */}
                </div>
            ))}
            <button onClick={addProject}>Add Project</button>
        </div>
    );
};

export default Projects;
