import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
const RequestOrderDetail = () => {
  const [requestDetails, setRequestDetails] = useState({});
  const reqid=999;
  useEffect(() => {
    // Fetch request details based on the user's login ID (userLoginId) from the provided API endpoint
    axios.get(`http://localhost:5000/reqs/${reqid}`) // Use user's login ID as reqid
      .then(response => {
        setRequestDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching request details:', error);
      });
  }, [reqid]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4">Request Details for Request ID {reqid}</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(requestDetails).map(field => (
              <TableRow key={field}>
                <TableCell>{field}</TableCell>
                <TableCell>{field === 'timestamp' ? new Date(requestDetails[field]).toLocaleString() : requestDetails[field]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default RequestOrderDetail;
