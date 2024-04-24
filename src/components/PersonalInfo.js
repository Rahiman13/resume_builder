import React, { useState, useEffect } from 'react';

const PersonalInfo = ({ personalInfo, setPersonalInfo }) => {
    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo(prevInfo => ({
            ...prevInfo,
            [name]: value
        }));
    };

    useEffect(() => {
        const storedPersonalInfo = localStorage.getItem('personalInfo');
        if (storedPersonalInfo) {
            setPersonalInfo(JSON.parse(storedPersonalInfo));
        }
    }, []); // Load personal info from local storage on component mount

    useEffect(() => {
        localStorage.setItem('personalInfo', JSON.stringify(personalInfo));
    }, [personalInfo]); // Update local storage when personal info changes

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Proceed with form submission
            console.log('Form submitted:', personalInfo);
        } else {
            console.log('Form validation failed');
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!personalInfo.fullName) {
            newErrors.fullName = 'Full Name is required';
            valid = false;
        }

        if (!personalInfo.email) {
            newErrors.email = 'Email Address is required';
            valid = false;
        } else if (!isValidEmail(personalInfo.email)) {
            newErrors.email = 'Invalid Email Address';
            valid = false;
        }

        if (!personalInfo.phone) {
            newErrors.phone = 'Phone Number is required';
            valid = false;
        } else if (!isValidPhone(personalInfo.phone)) {
            newErrors.phone = 'Invalid Phone Number';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const isValidEmail = (email) => {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPhone = (phone) => {
        // Basic phone number validation regex
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };

    return (
        <div>
            <h2>Personal Information</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fullName">Full Name:</label>
                    <input type="text" id="fullName" name="fullName" value={personalInfo.fullName || ''} onChange={handleChange} />
                    {errors.fullName && <span className="error">{errors.fullName}</span>}
                </div>

                <div>
                    <label htmlFor="email">Email Address:</label>
                    <input type="email" id="email" name="email" className="input" value={personalInfo.email || ''} onChange={handleChange} />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div>
                    <label htmlFor="phone">Phone Number:</label>
                    <input type="tel" id="phone" name="phone" className="input" value={personalInfo.phone || ''} onChange={handleChange} />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                </div>

                <div>
                    <label htmlFor="linkedin">LinkedIn Profile (optional):</label>
                    <input type="text" id="linkedin" name="linkedin" className="input" value={personalInfo.linkedin || ''} onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="website">Professional Website (if relevant):</label>
                    <input type="url" id="website" name="website" className="input" value={personalInfo.website || ''} onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="summary">Summary/Objective:</label>
                    <textarea id="summary" name="summary" className="input" value={personalInfo.summary || ''} onChange={handleChange} rows="4" cols="50" />
                </div>

                {/* <button type="submit">Submit</button> */}
            </form>
        </div>
    );
};

export default PersonalInfo;
