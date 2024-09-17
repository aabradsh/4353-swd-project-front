import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, MenuItem } from '@mui/material';

const states = [
  { value: 'TX', label: 'Texas' },
  { value: 'CA', label: 'California' },
  // Add more states as needed
];

function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <Container maxWidth="sm" style={{ color: 'white', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom style={{ color: 'white', textAlign: 'center' }}>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white' } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white' } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white' } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address 1"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white' } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address 2"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white' } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white' } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white' } }}
            >
              {states.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Zipcode"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white' } }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" sx={{ backgroundColor: '#ea00d9' }} fullWidth>
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default RegisterForm;
