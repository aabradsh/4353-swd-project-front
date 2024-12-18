import React, { useState, useEffect } from 'react';
import { Container, List, ListItem, Paper, Typography } from '@mui/material';
import axios from 'axios';
import './VolunteerHistory.css';  // CSS for styling

function VolunteerHistory() {
  const [history, setHistory] = useState([]);

  // Connects back end to front end
  useEffect(() => {
    axios.get('http://localhost:4000/api/volunteerHistory/show', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`  // Assuming JWT authentication
      }
    })
      .then(response => {
        //Sort the events from most recent date to oldest date
        let eventData = response.data.sort((a, b) => {
          const date_a = a.eventDate;
          const date_b = b.eventDate;
          if (date_a < date_b) {
            return 1;
          }
          else if (date_a > date_b) {
            return -1;
          }
          return 0;
        });
        //Recieves the relevant events from the backend
        console.log(eventData);
        setHistory(eventData);
      })

  }, []);
  //Creates a table for each event received from the back end
  return (
    <Container maxWidth="md" className="history-container">
      
      <Paper elevation={3} className="history-paper">
        <Typography variant="h4" className="history-title">
          VOLUNTEER HISTORY
        </Typography>

        {history.length === 0 ? (
          <Typography variant="body1">NO EVENT HISTORY YET!</Typography>
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
                      <th scope="row"> EVENT DETAILS: </th>
                      <td> {event.details} </td>
                    </tr>

                    <tr>
                      <th scope="row"> LOCATION: </th>
                      <td> {event.location} </td>
                    </tr>

                    <tr>
                      <th scope="row"> REQUIRED SKILLS: </th>
                      <td> {event.requiredSkills} </td>
                    </tr>

                    <tr>
                      <th scope="row"> URGENCY: </th>
                      <td> {event.urgency} </td>
                    </tr>

                    <tr>
                      <th scope="row"> EVENT DATE: </th>
                      <td> {new Date(event.eventDate).toDateString()} </td>
                    </tr>

                    <tr>
                      <th scope="row"> VOLUNTEER STATUS: </th>
                      <td> Signed up </td>
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