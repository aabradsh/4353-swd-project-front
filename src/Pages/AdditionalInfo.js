import React, { useState } from 'react';
import {
  Container, TextField, Button, Box, Typography, Paper, MenuItem, Select, InputLabel, FormControl, Chip,
  Checkbox, ListItemText, OutlinedInput, TextareaAutosize, IconButton
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import './AdditionalInfo.css'; // Import the CSS file

const skillsList = ['Coding', 'Design', 'Marketing', 'Writing', 'Management'];
const statesList = ['AL', 'AK', 'AZ', 'CA', 'NY', 'TX']; 

function AdditionalInfo() {
  const [formData, setFormData] = useState({
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    skills: [],
    preferences: '',
    availability: [null] // Start with one date picker
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSkillsChange = (e) => {
    setFormData((prevData) => ({ ...prevData, skills: e.target.value }));
  };

  const handleDateChange = (index, date) => {
    const newAvailability = [...formData.availability];
    newAvailability[index] = date;
    setFormData((prevData) => ({ ...prevData, availability: newAvailability }));
  };

  const addDatePicker = () => {
    setFormData((prevData) => ({
      ...prevData,
      availability: [...prevData.availability, null]
    }));
  };

  const removeDatePicker = (index) => {
    const newAvailability = formData.availability.filter((_, i) => i !== index);
    setFormData((prevData) => ({ ...prevData, availability: newAvailability }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log(formData);
  };

  return (
    <Container maxWidth="sm" className="additional-info-container">
      <Paper elevation={3} className="additional-info-paper">
        <Typography variant="h4" className="additional-info-title">
          ADDITIONAL INFORMATION
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              inputProps={{ maxLength: 50 }}
              required
              fullWidth
              className="additional-info-input"
            />
            <TextField
              label="Address 1"
              name="address1"
              value={formData.address1}
              onChange={handleInputChange}
              inputProps={{ maxLength: 100 }}
              required
              fullWidth
              className="additional-info-input"
            />
            <TextField
              label="Address 2 (Optional)"
              name="address2"
              value={formData.address2}
              onChange={handleInputChange}
              inputProps={{ maxLength: 100 }}
              fullWidth
              className="additional-info-input"
            />
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              inputProps={{ maxLength: 100 }}
              required
              fullWidth
              className="additional-info-input"
            />
            <FormControl fullWidth required>
              <InputLabel id="state-label">State</InputLabel>
              <Select
                labelId="state-label"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                label="State"
                required
              >
                {statesList.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Zip Code"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
              inputProps={{ maxLength: 9, minLength: 5 }}
              required
              fullWidth
              className="additional-info-input"
            />
            <FormControl fullWidth required>
              <InputLabel id="skills-label">Skills</InputLabel>
              <Select
                labelId="skills-label"
                multiple
                value={formData.skills}
                onChange={handleSkillsChange}
                input={<OutlinedInput label="Skills" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {skillsList.map((skill) => (
                  <MenuItem key={skill} value={skill}>
                    <Checkbox checked={formData.skills.indexOf(skill) > -1} />
                    <ListItemText primary={skill} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextareaAutosize
              aria-label="Preferences"
              minRows={3}
              placeholder="Preferences (Optional)"
              className="additional-info-textarea"
              value={formData.preferences}
              name="preferences"
              onChange={handleInputChange}
            />
            
            <Typography variant="h6" gutterBottom>Availability</Typography>

            {formData.availability.map((date, index) => (
              <Box key={index} className="additional-info-date-picker">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label={`Select Date ${index + 1}`}
                    value={date}
                    onChange={(newDate) => handleDateChange(index, newDate)}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                  />
                </LocalizationProvider>
                <IconButton color="error" onClick={() => removeDatePicker(index)}>
                  <RemoveCircle />
                </IconButton>
              </Box>
            ))}

            <Button
              variant="outlined"
              onClick={addDatePicker}
              startIcon={<AddCircle />}
              className="additional-info-add-button"
            >
              Add Another Date
            </Button>

            <Button
              variant="contained"
              type="submit"
              fullWidth
              className="additional-info-submit-button"
            >
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default AdditionalInfo;