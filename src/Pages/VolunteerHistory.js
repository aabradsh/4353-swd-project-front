import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, List, ListItem, ListItemText, Divider, Badge } from '@mui/material';
import './Notifications.css';  // CSS for styling

function VolunteerHistory() {
  const [notifications, setNotifications] = useState([]);

  // Simulating notification fetch (replace this with actual API call if needed)
  useEffect(() => {
    const dummyNotifications = [
      { id: 1, type: 'event', message: 'You have been assigned to the Hackathon.', date: '2024-09-01' },
      { id: 2, type: 'update', message: 'The Hackathon has been rescheduled.', date: '2024-09-10' },
      { id: 3, type: 'reminder', message: 'Reminder: Hackathon is tomorrow.', date: '2024-09-20' }
    ];

    // You can fetch these from an API in a real-world app
    setNotifications(dummyNotifications);
  }, []);

  return (
    <Container maxWidth="md" className="notifications-container">
      <Typography variant="h4" className="notifications-title">
        Notifications
      </Typography>

      <Paper elevation={3} className="notifications-paper">
        {notifications.length === 0 ? (
          <Typography variant="body1">No notifications at the moment.</Typography>
        ) : (
          <List>
            {notifications.map(notification => (
              <React.Fragment key={notification.id}>
                <ListItem alignItems="flex-start">
                  <Badge
                    color={
                      notification.type === 'event'
                        ? 'primary'
                        : notification.type === 'update'
                        ? 'secondary'
                        : 'warning'
                    }
                    badgeContent={notification.type === 'event' ? 'Event' : notification.type === 'update' ? 'Update' : 'Reminder'}
                  />
                  <ListItemText
                    primary={notification.message}
                    secondary={`Date: ${notification.date}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
}


export default VolunteerHistory;