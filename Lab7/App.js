import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    rollNo: '',
    password: '',
    confirmPassword: '',
    contact: ''
  });

  // Fetch students
  const fetchStudents = async () => {
    const response = await axios.get('http://localhost:5000/students');
    setStudents(response.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle form data change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submit for adding student
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    await axios.post('http://localhost:5000/students', formData);
    fetchStudents();
    setFormData({
      firstName: '',
      lastName: '',
      rollNo: '',
      password: '',
      confirmPassword: '',
      contact: ''
    });
  };

  // Handle student deletion
  const handleDelete = async (rollNo) => {
    await axios.delete(`http://localhost:5000/students/${rollNo}`);
    fetchStudents();
  };

  // Handle student update
  const handleUpdate = async (rollNo) => {
    const updatedContact = prompt('Enter new contact number:');
    if (updatedContact) {
      await axios.put(`http://localhost:5000/students/${rollNo}`, { contact: updatedContact });
      fetchStudents();
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 5, mb: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          Student Registration System
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ padding: 3, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required fullWidth />
            <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required fullWidth />
            <TextField label="Roll No" name="rollNo" value={formData.rollNo} onChange={handleChange} required fullWidth />
            <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required fullWidth />
            <TextField label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required fullWidth />
            <TextField label="Contact Number" name="contact" value={formData.contact} onChange={handleChange} required fullWidth />
            <Button type="submit" variant="contained" color="primary">
              Add Student
            </Button>
          </Box>
        </form>
      </Paper>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom align="center">
          Student Records
        </Typography>
      </Box>

      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Roll No</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.rollNo}>
                <TableCell>{student.firstName}</TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell>{student.rollNo}</TableCell>
                <TableCell>{student.contact}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(student.rollNo)}
                    sx={{ mr: 1 }}
                  >
                    Delete
                  </Button>
                  <Button variant="contained" color="info" onClick={() => handleUpdate(student.rollNo)}>
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export default App;
