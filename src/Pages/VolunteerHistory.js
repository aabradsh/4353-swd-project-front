import React, { useState, useEffect } from 'react';
import { Container, List, ListItem, Paper, Typography } from '@mui/material';
import axios from 'axios';
import './VolunteerHistory.css';  // CSS for styling

function VolunteerHistory() {
  const [history, setHistory] = useState([]);

  // Simulating notification fetch (replace this with actual API call if needed)
  useEffect(() => {
    axios.get('http://localhost:4000/api/volunteerHistory/events', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`  // Assuming JWT authentication
      }
    })
      .then(response => {
        
        let eventData = response.data.sort((a, b) => {
          const date_a = a.date;
          const date_b = b.date;
          if (date_a < date_b) {
            return 1;
          }
          else if (date_a > date_b) {
            return -1;
          }
          return 0;
        });
        console.log(eventData);
        setHistory(eventData);
      })

  }, []);

  return (
    <Container maxWidth="md" className="history-container">
      <Typography variant="h4" className="history-title">
        Volunteer History
      </Typography>

      <Paper elevation={3} className="history-paper">
        {history.length === 0 ? (
          <Typography variant="body1">No history at the moment.</Typography>
        ) : (
          <List>
            {history.map(event => (
              <ListItem>
                <table>
                  <caption>
                    <strong> {event.name} </strong>
                  </caption>

                  <tbody>
                    <tr>
                      <th scope="row"> Event Details: </th>
                      <td> {event.details} </td>
                    </tr>

                    <tr>
                      <th scope="row"> Location: </th>
                      <td> {event.location} </td>
                    </tr>

                    <tr>
                      <th scope="row"> Required Skills: </th>
                      <td> {event.requiredSkills} </td>
                    </tr>

                    <tr>
                      <th scope="row"> Urgency: </th>
                      <td> {event.urgency} </td>
                    </tr>

                    <tr>
                      <th scope="row"> Event Date: </th>
                      <td> {new Date(event.date).toDateString()} </td>
                    </tr>

                    <tr>
                      <th scope="row"> Volunteer Status: </th>
                      <td> "Input Volunteer Participation Status" </td>
                    </tr>
                  </tbody>
                </table>
              </ListItem>
            ))}
          </List>

        )}
      </Paper>
    </Container>
  );
}


export default VolunteerHistory;