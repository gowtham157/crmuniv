import React, { Component } from 'react';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      selectedCourses: [],
      selectedUniversities: [],
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleCourseSelection = (event) => {
    const course = event.target.value;
    const { selectedCourses } = this.state;

    if (!selectedCourses.includes(course) && selectedCourses.length < 3) {
      this.setState((prevState) => ({
        selectedCourses: [...prevState.selectedCourses, course],
      }));
    }
  };

  handleUniversitySelection = (event) => {
    const university = event.target.value;
    const { selectedUniversities } = this.state;

    if (!selectedUniversities.includes(university) && selectedUniversities.length < 3) {
      this.setState((prevState) => ({
        selectedUniversities: [...prevState.selectedUniversities, university],
      }));
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
  
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <h1>Student Registration Form</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            Select Courses (at least 3):
            <select onChange={this.handleCourseSelection} multiple>
              <option value="Course 1">Masters in Computer Science</option>
              <option value="Course 2">Masters in Cyber Security</option>
              <option value="Course 3">Masters in Software Engineering</option>
              <option value="Course 4">Masters in Business Administration</option>
            </select>
          </label>
          <br />
          <label>
            Select Universities (at least 3):
            <select onChange={this.handleUniversitySelection} multiple>
              <option value="University 1">University of Leeds</option>
              <option value="University 2">University of Liverpool</option>
              <option value="University 3">University of Leicester</option>
              <option value="University 4">University of Northampton</option>

            </select>
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
