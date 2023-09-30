import React, { useState } from 'react';

const RegistrationForm = () => {
  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    courses: [],
    universities: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleCourseChange = (e) => {
    const { value } = e.target;
    // Ensure at least three courses are selected
    if (studentData.courses.length < 3) {
      setStudentData({ ...studentData, courses: [...studentData.courses, value] });
    }
  };

  const handleUniversityChange = (e) => {
    const { value } = e.target;
    // Ensure at least three universities are selected
    if (studentData.universities.length < 3) {
      setStudentData({ ...studentData, universities: [...studentData.universities, value] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://3.90.145.92:8081/crmuniv/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        throw new Error('Failed to register student');
      }

      const data = await response.json();
      console.log(data); // Handle the response data as needed
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" onChange={handleChange} required />
      </div>
      <div>
        <label>Select Courses (At least 3):</label>
        <select name="courses" onChange={handleCourseChange} multiple>
          {/* Add course options here */}
        </select>
      </div>
      <div>
        <label>Select Universities (At least 3):</label>
        <select name="universities" onChange={handleUniversityChange} multiple>
          {/* Add university options here */}
        </select>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
