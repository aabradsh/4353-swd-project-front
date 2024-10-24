import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Box, Typography, Paper, Alert, MenuItem } from '@mui/material';
import axios from 'axios';
import './VolunteerMatching.css'; 

// Dummy data for volunteers and events
const dummyEvents = [
  { id: 1, name: 'Hackathon', requiredSkills: ['Cybersecurity', 'Event Planning'] },
  { id: 2, name: 'Workshops', requiredSkills: ['Software Design', 'Teamwork'] },
  { id: 3, name: 'Career Fair', requiredSkills: ['Computer Engineering', 'Leadership'] }
];

const dummyVolunteers = [
  { id: 1, name: 'Jerry Smith', skills: ['Software Design', 'Event Planning'] },
  { id: 2, name: 'Rick Sanchez', skills: ['Computer Engineering', 'Leadership'] },
  { id: 3, name: 'Morty Smith', skills: ['Cybersecurity', 'Teamwork'] }
];

function VolunteerMatching() {
  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState('');
  const [matchedEvent, setMatchedEvent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetching volunteers
    axios.get('/api/volunteers')
      .then(response => {
        setVolunteers(response.data);
        setErrorMessage('');  
      })
      .catch(error => {
        console.error('Error fetching volunteers:', error);
        setErrorMessage('Error fetching volunteers, using dummy data.');
        setVolunteers(dummyVolunteers);  // Use dummy data if API call fails
      });

    // Fetching events
    axios.get('/api/events')
      .then(response => {
        setEvents(response.data);
        setErrorMessage(''); 
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setErrorMessage('Error fetching events, using dummy data.');
        setEvents(dummyEvents);  
      });
  }, []);

  // Handle volunteer selection from the dropdown
  const handleVolunteerSelect = (e) => {
    const selectedId = e.target.value;
    setSelectedVolunteer(selectedId);
    
    const matchingEvent = findMatchingEvent(selectedId);
    if (matchingEvent) {
      setMatchedEvent(matchingEvent.name);
      setErrorMessage('');
    } else {
      setMatchedEvent('');
      setErrorMessage('No matching event found for this volunteer.');
    }
  };

  // Function to find matching event based on volunteer's skills
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
          VOLUNTEER MATCHING
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
