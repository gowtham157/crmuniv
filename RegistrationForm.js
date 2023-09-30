import React, { useState } from 'react';
import { TextField, Button, Container, Grid, MenuItem } from '@mui/material';

const RegistrationForm = ({ onApiResponse }) => {
  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    courses: [],
    universities: [],
  });

  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleCourseChange = (e) => {
    const { value } = e.target;
    setSelectedCourse(value);
  };

  const handleUniversityChange = (e) => {
    const { value } = e.target;
    setSelectedUniversity(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedStudentData = {
        ...studentData,
        courses: [...studentData.courses, selectedCourse],
        universities: [...studentData.universities, selectedUniversity],
      };

      const response = await fetch('http://3.90.145.92:8081/crmuniv/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStudentData),
      });

      if (!response.ok) {
        throw new Error('Failed to register student');
      }

      const data = await response.json();
      console.log(data); // Handle the response data as needed
      // Pass the response data to the parent component
      onApiResponse(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Sample course and university options (replace with actual options)
  const sampleCourses = ['Course 1', 'Course 2', 'Course 3', 'Course 4'];
  const sampleUniversities = ['University A', 'University B', 'University C', 'University D'];

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              variant="outlined"
              value={studentData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              value={studentData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              select
              label="Select Course"
              name="course"
              variant="outlined"
              value={selectedCourse}
              onChange={handleCourseChange}
              required
            >
              {sampleCourses.map((course) => (
                <MenuItem key={course} value={course}>
                  {course}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              select
              label="Select University"
              name="university"
              variant="outlined"
              value={selectedUniversity}
              onChange={handleUniversityChange}
              required
            >
              {sampleUniversities.map((university) => (
                <MenuItem key={university} value={university}>
                  {university}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default RegistrationForm;
