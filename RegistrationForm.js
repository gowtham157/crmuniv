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
              <option value="Course 1">Masters in Computer Science</option>
              <option value="Course 2">Masters in Cyber Security</option>
              <option value="Course 3">Masters in Software Engineering</option>
              <option value="Course 4">Masters in Business Administration</option>
        </select>
      </div>
      <div>
        <label>Select Universities (At least 3):</label>
        <select name="universities" onChange={handleUniversityChange} multiple>
			        <option value="University 1">University of Leeds</option>
              <option value="University 2">University of Liverpool</option>
              <option value="University 3">University of Leicester</option>
              <option value="University 4">University of Northampton</option>
        </select>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
