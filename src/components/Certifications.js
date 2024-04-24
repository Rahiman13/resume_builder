import React, { useState, useEffect } from 'react';

const Certifications = ({ certifications, setCertifications }) => {
    const [selectedCertificate, setSelectedCertificate] = useState('');
    
    const certificateOptions = [
        'Certificate 1',
        'Certificate 2',
        'Certificate 3',
        'Certificate 4',
        // Add more certificate options as needed
    ];

    useEffect(() => {
        const storedCertifications = localStorage.getItem('certifications');
        if (storedCertifications) {
            setCertifications(JSON.parse(storedCertifications));
        }
    }, []); // Load certifications from local storage on component mount

    useEffect(() => {
        localStorage.setItem('certifications', JSON.stringify(certifications));
    }, [certifications]); // Update local storage when certifications change

    const handleSelectCertificate = (certificate) => {
        setSelectedCertificate(certificate);
        setCertifications([...certifications, certificate]);
    };

    const removeCertificate = (certificateToRemove) => {
        setCertifications(certifications.filter(cert => cert !== certificateToRemove));
    };

    return (
        <div>
            <h2>Certifications</h2>
            <select value={selectedCertificate} className="input" onChange={(e) => handleSelectCertificate(e.target.value)}>
                <option value="">Select Certificate</option>
                {certificateOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
            <ul>
                {certifications.map((cert, index) => (
                    <li key={index}>
                        {cert}
                        <span onClick={() => removeCertificate(cert)} style={{ cursor: 'pointer', marginLeft: '5px' }}>×</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Certifications;
