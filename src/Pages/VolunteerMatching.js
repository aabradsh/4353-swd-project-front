import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Box, Typography, Paper, Alert, MenuItem } from '@mui/material';
import axios from 'axios';
import './VolunteerMatching.css'; 

function VolunteerMatching() {
  const [volunteers, setVolunteers] = useState([]);
  // const [events, setEvents] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState('');
  const [matchedEvent, setMatchedEvent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/api/volunteers') 
      .then(response => {
        console.log('Fetched volunteers:', response.data);
        setVolunteers(response.data);
        setErrorMessage('');  
      })
      .catch(error => {
        console.error('Error fetching volunteers:', error);
        setErrorMessage('Error fetching volunteers.');
      });
  }, []);

  const handleVolunteerSelect = (e) => {
    const selectedId = e.target.value;
    setSelectedVolunteer(selectedId);
  
    // Fetch the best-matched event for the selected volunteer
    axios.get(`http://localhost:4000/api/volunteer-matching/match`, {
      params: { volunteerId: selectedId }
    })
    .then(response => {
      const matchingEvent = response.data[0]; // Backend returns the best-matched event
      if (matchingEvent) {
        setMatchedEvent(matchingEvent.name); // Display the event name
        setErrorMessage('');
      } else {
        setMatchedEvent('');
        setErrorMessage('No matching event found for this volunteer.');
      }
    })
    .catch(error => {
      console.error('Error fetching matched event:', error);
      setErrorMessage('Error fetching matched event.');
    });
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
