import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, List, ListItem, ListItemText, Divider, Badge } from '@mui/material';
import axios from 'axios';  // For making API requests
import './Notifications.css';  // CSS for styling

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);  // Add loading state
  const [error, setError] = useState(null);  // Add error state

  // Fetch notifications from the back end when the component loads
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Replace 'http://localhost:4000' with your deployed backend URL if applicable
        const res = await axios.get('http://localhost:4000/api/notifications', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`  // Assuming JWT authentication
          }
        });
        setNotifications(res.data);  // Update state with fetched notifications
        setLoading(false);  // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching notifications", error);
        setError("Failed to load notifications.");  // Handle error
        setLoading(false);  // Set loading to false even if there's an error
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <Typography variant="body1">Loading notifications...</Typography>;
  }

  if (error) {
    return <Typography variant="body1" color="error">{error}</Typography>;
  }

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
              <React.Fragment key={notification._id}>  {/* Use _id from MongoDB */}
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
                    secondary={`Date: ${new Date(notification.createdAt).toLocaleDateString()}`}
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

export default Notifications;
