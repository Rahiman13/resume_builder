import React, { useState, useEffect } from 'react';

const Education = () => {
    const [educationSets, setEducationSets] = useState([
        { id: 1, school: '', CGPA: '', gradYear: '', specialization: '', placeholderText: '10th' }
    ]);

    useEffect(() => {
        const storedEducation = localStorage.getItem('educationSets');
        if (storedEducation) {
            setEducationSets(JSON.parse(storedEducation));
        }
    }, []); // Load education sets from local storage on component mount

    useEffect(() => {
        localStorage.setItem('educationSets', JSON.stringify(educationSets));
    }, [educationSets]); // Update local storage when education sets change

    const handleChange = (id, e) => {
        const { name, value } = e.target;
        setEducationSets(prevSets =>
            prevSets.map(set =>
                set.id === id ? { ...set, [name]: value } : set
            )
        );
    };

    const addEducation = () => {
        const newId = educationSets.length + 1;
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
            setEducationSets([...educationSets, { id: newId, school: '', CGPA: '', gradYear: '', specialization: '', placeholderText }]);
        }
    };

    return (
        <div className="Education">
            <h2>Education</h2>
            {educationSets.map(set => (
                <div key={set.id}>
                    <input type="text" name="school" placeholder={`School (${set.placeholderText})`} value={set.school} onChange={(e) => handleChange(set.id, e)} />
                    {set.id !== 1 && <input type="text" name="specialization" placeholder={`Specialization (${set.placeholderText})`} value={set.specialization} onChange={(e) => handleChange(set.id, e)} />}
                    <input type="number" className="input" name="CGPA" placeholder={`CGPA (${set.placeholderText})`} value={set.CGPA} onChange={(e) => handleChange(set.id, e)} />
                    <input type="number" className="input" name="gradYear" placeholder={`Graduation Year (${set.placeholderText})`} value={set.gradYear} onChange={(e) => handleChange(set.id, e)} />
                </div>
            ))}
            {educationSets.length < 4 && <button onClick={addEducation}>Add Education</button>}
        </div>
    );
};

export default Education;
