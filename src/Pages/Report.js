
import React, { useState, useEffect} from 'react';
import { Container, TextField, Button, Box, Typography, Paper, Alert, CircularProgress } from '@mui/material';
import './Login.css'; 
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_BASE_URL;



function Report() {
  const [response, SetResponse] = useState();

    async function generateReport(){
        const response = await axios.get(`${apiUrl}/report/generateReport`)
        .then((response) => response.data)
        .then((data)=>{
            console.log(data)
            const reportFile = new File([data], 'reports.zip');
            const url = window.URL.createObjectURL(
                new Blob([data]),
              );
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute(
                'download',
                `reports.zip`,
              );
          
              // Append to html link element page
              document.body.appendChild(link);
          
              // Start download
              link.click();
          
              // Clean up and remove the link
              link.parentNode.removeChild(link);
              
        })

    }

  useEffect(() => {

    const fetchData = async() => {
      try {
        const reponse = await axios.get(`${apiUrl}/api/hello`);
        console.log(reponse.data);
        SetResponse(reponse.data);
      }

      catch (error) {
        console.error(error);
      }
    }

    fetchData();
  });

  return (
    <Container className="login-container" maxWidth="sm">
      <Paper className="login-paper" elevation={3}>
        <Typography className="login-title" variant="h4">Report Center</Typography>
        {/* {successMessage && <Alert className="login-success" severity="success">{successMessage}</Alert>} */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <label>
                Generate Report
            <Button 
              className="report-button"  
              fullWidth 
              variant="contained"
              onClick={generateReport}
            >
            </Button>
            </label>
          </Box>
      </Paper>
    </Container>
  );
}

export default Report;