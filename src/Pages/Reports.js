import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Reports.css'; 

function Reports() {
  const [volunteerHistory, setVolunteerHistory] = useState([]);
  const [events, setEvents] = useState([]);
  const fetchVolunteerHistory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/volunteerHistory');
      setVolunteerHistory(response.data);
    } catch (error) {
      console.error('Error fetching volunteer history:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/eventmanagement');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchVolunteerHistory();
    fetchEvents();
  }, []);
  const downloadReport = (type, format) => {
    window.open(`http://localhost:5000/api/reports/${type}?format=${format}`, '_blank');
  };

  return (
    <div className="reports-page">
      <div className="overlay"></div>
      <div className="center-wrapper">
        <div className="container">
          <h1 className="reports-title">REPORTS DASHBOARD</h1>
          <div className="reports-buttons">
            <button className="report-btn" onClick={() => downloadReport('volunteerHistory', 'pdf')}>
              DOWNLOAD VOLUNTEER HISTORY (PDF)
            </button>
            <button className="report-btn" onClick={() => downloadReport('volunteerHistory', 'csv')}>
              DOWNLOAD VOLUNTEER HISTORY (CSV)
            </button>
            <button className="report-btn" onClick={() => downloadReport('events', 'pdf')}>
              DOWNLOAD EVENTS HISTORY REPORT (PDF)
            </button>
            <button className="report-btn" onClick={() => downloadReport('events', 'csv')}>
              DOWNLOAD EVENTS HISTORY REPORT (CSV)
            </button>
          </div>
          <div className="data-preview">
            <h2>VOLUNTEER HISTORY PREVIEW</h2>
            <ul>
              {volunteerHistory.slice(0, 5).map((item, index) => (
                <li key={index}>
                  {item.volunteerName} - {item.eventName} ({new Date(item.eventDate).toLocaleDateString()})
                </li>
              ))}
            </ul>
            <h2>EVENTS REPORT PREVIEW</h2>
            <ul>
              {events.slice(0, 5).map((event, index) => (
                <li key={index}>
                  {event.eventName} - {event.location} ({new Date(event.eventDate).toLocaleDateString()})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Reports;