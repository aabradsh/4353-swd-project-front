import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Box, Typography, Paper, Alert, MenuItem } from '@mui/material';
import axios from 'axios';
import './VolunteerMatching.css'; // Import the CSS file

function VolunteerMatching() {
  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState('');
  const [matchedEvent, setMatchedEvent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch volunteers and events from the API when the component mounts
  useEffect(() => {
    axios.get('/api/volunteers')
      .then(response => setVolunteers(response.data))
      .catch(error => setErrorMessage('Error fetching volunteers'));

    axios.get('/api/events')
      .then(response => setEvents(response.data))
      .catch(error => setErrorMessage('Error fetching events'));
  }, []);

  const handleVolunteerSelect = (e) => {
    const selectedId = e.target.value;
    setSelectedVolunteer(selectedId);
    
    const matchingEvent = findMatchingEvent(selectedId);
    if (matchingEvent) {
      setMatchedEvent(matchingEvent.name);
      setErrorMessage('');
    } else {
      setMatchedEvent('');
      setErrorMessage('No matching event found for this volunteer');
    }
  };

  const findMatchingEvent = (volunteerId) => {
    const volunteer = volunteers.find(v => v.id === volunteerId);
    return events.find(event => 
      event.requiredSkills.some(skill => volunteer.skills.includes(skill))
    );
  };

  return (
    <Container maxWidth="sm" className="volunteer-matching-container">
      <Paper elevation={3} className="volunteer-matching-paper">
        <Typography variant="h4" className="volunteer-matching-title">
          Volunteer Matching
        </Typography>

        {errorMessage && <Alert severity="error" className="volunteer-matching-error">{errorMessage}</Alert>}

        <form>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Volunteer Name Dropdown */}
            <TextField
              label="Select Volunteer"
              variant="outlined"
              select
              value={selectedVolunteer}
              onChange={handleVolunteerSelect}
              required
              fullWidth
              className="volunteer-matching-input"
            >
              {volunteers.map((volunteer) => (
                <MenuItem key={volunteer.id} value={volunteer.id}>
                  {volunteer.name}
                </MenuItem>
              ))}
            </TextField>

            {/* Matched Event */}
            <TextField
              label="Matched Event"
              variant="outlined"
              value={matchedEvent}
              readOnly
              fullWidth
              className="volunteer-matching-input"
            />

            <Button className="volunteer-matching-button" type="submit" fullWidth>
              Match Volunteer
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default VolunteerMatching;
