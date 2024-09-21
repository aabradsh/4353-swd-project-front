import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography} from '@mui/material';
import './VolunteerHistory.css';  // CSS for styling

function VolunteerHistory() {
  const [history, setHistory] = useState([]);

  // Simulating notification fetch (replace this with actual API call if needed)
  useEffect(() => {
    const dummyHistory = [
      { type: 'History', message: 'No History at the Moment', date: '2024-09-20' }
    ];

    // You can fetch these from an API in a real-world app
    setHistory(dummyHistory);
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
          <table>
            <caption>
                <strong> Event 1 </strong>
            </caption>

            <tbody>
                <tr>
                    <th scope="row"> Event Name: </th>
                    <td> "Input Event Name" </td>
                </tr>

                <tr>
                    <th scope="row"> Event Description: </th>
                    <td> "Input Event Description" </td>
                </tr>

                <tr>
                    <th scope="row"> Location: </th>
                    <td> "Input Location" </td>
                </tr>

                <tr>
                    <th scope="row"> Required Skills: </th>
                    <td> "Input Required Skills" </td>
                </tr>

                <tr>
                    <th scope="row"> Urgency: </th>
                    <td> "Input Urgency" </td>
                </tr>

                <tr>
                    <th scope="row"> Event Date: </th>
                    <td> "Input Event Date" </td>
                </tr>

                <tr>
                    <th scope="row"> Volunteer Status: </th>
                    <td> "Input Volunteer Participation Status" </td>
                </tr>
            </tbody>
          </table>
        )}
      </Paper>
    </Container>
  );
}


export default VolunteerHistory;