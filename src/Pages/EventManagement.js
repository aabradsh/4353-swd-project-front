import React, { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  Input,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const skillsList = ['Python', 'C++', 'C#', 'C', 'JavaScript', 'HTML', 'IT', 'Computer Repair'];
const urgencies = ['Low', 'Medium', 'High'];

function EventManagement() {
  const [formData, setFormData] = useState({
    eventName: '',
    eventDescription: '',
    location: '',
    requiredSkills: [],
    urgency: '',
    eventDate: null,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, eventDate: date });
  };

  const handleSkillsChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, requiredSkills: typeof value === 'string' ? value.split(',') : value });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.eventName = formData.eventName ? '' : 'Event Name is required';
    tempErrors.eventDescription = formData.eventDescription ? '' : 'Event Description is required';
    tempErrors.location = formData.location ? '' : 'Location is required';
    tempErrors.requiredSkills = formData.requiredSkills.length ? '' : 'Please select at least one skill';
    tempErrors.urgency = formData.urgency ? '' : 'Urgency level is required';
    tempErrors.eventDate = formData.eventDate ? '' : 'Event date is required';
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Submitting form data:', formData);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container maxWidth="md">
          <Box
            sx={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: 3,
            }}
          >
            <Typography variant="h4" gutterBottom align="center" sx={{ color: 'black' }}>
              Event Management Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Event Name"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleInputChange}
                    error={Boolean(errors.eventName)}
                    helperText={errors.eventName}
                    inputProps={{ maxLength: 100 }}
                    margin="normal"
                    sx={{
                      backgroundColor: 'white',
                      input: { color: 'black' },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Event Description"
                    name="eventDescription"
                    multiline
                    rows={4}
                    value={formData.eventDescription}
                    onChange={handleInputChange}
                    error={Boolean(errors.eventDescription)}
                    helperText={errors.eventDescription}
                    margin="normal"
                    sx={{
                      backgroundColor: 'white',
                      input: { color: 'black' },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Location"
                    name="location"
                    multiline
                    rows={2}
                    value={formData.location}
                    onChange={handleInputChange}
                    error={Boolean(errors.location)}
                    helperText={errors.location}
                    margin="normal"
                    sx={{
                      backgroundColor: 'white',
                      input: { color: 'black' },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth margin="normal" error={Boolean(errors.requiredSkills)}>
                    <InputLabel sx={{ color: 'black' }}>Required Skills</InputLabel>
                    <Select
                      multiple
                      name="requiredSkills"
                      value={formData.requiredSkills}
                      onChange={handleSkillsChange}
                      input={<Input />}
                      renderValue={(selected) => selected.join(', ')}
                      sx={{
                        backgroundColor: 'white',
                        color: 'black',
                      }}
                    >
                      {skillsList.map((skill) => (
                        <MenuItem key={skill} value={skill}>
                          <Checkbox checked={formData.requiredSkills.indexOf(skill) > -1} />
                          <ListItemText primary={skill} />
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.requiredSkills && <Typography color="error">{errors.requiredSkills}</Typography>}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth margin="normal" error={Boolean(errors.urgency)}>
                    <InputLabel sx={{ color: 'black' }}>Urgency</InputLabel>
                    <Select
                      label="Urgency"
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      sx={{
                        backgroundColor: 'white',
                        color: 'black',
                      }}
                    >
                      {urgencies.map((urgency, index) => (
                        <MenuItem key={index} value={urgency}>
                          {urgency}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.urgency && <Typography color="error">{errors.urgency}</Typography>}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth margin="normal" error={Boolean(errors.eventDate)}>
                    <DatePicker
                      label="Event Date"
                      value={formData.eventDate}
                      onChange={handleDateChange}
                      renderInput={(params) => (
                        <TextField {...params} sx={{ backgroundColor: 'white', input: { color: 'black' } }} />
                      )}
                    />
                    {errors.eventDate && <Typography color="error">{errors.eventDate}</Typography>}
                  </FormControl>
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                Submit
              </Button>
            </form>
          </Box>
        </Container>
    </LocalizationProvider>
  );
};

export default EventManagement;