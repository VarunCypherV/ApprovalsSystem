import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const RequestOrderDetail = (props) => {
  const [requestDetails, setRequestDetails] = useState([]);
  const [error, setError] = useState(null);
  const requestorid = props.requestoridz;

  const fields = [
    'reqid',
    'workflowId',
    'requestorid',
    'timestamp',
    'NoOfApprovals',
    'status'
  ];

  const fetchData = async () => {
    try {
      console.log(`http://localhost:5000/reqs/${requestorid}`);
      const response = await axios.get(`http://localhost:5000/reqs/${requestorid}`);
      setRequestDetails(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching request details:', error);
      setError(error);
    }
  };

  useEffect(() => {
    if (requestorid) {
      fetchData();
    }
  }, [requestorid]);

  if (error) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h4">Error Fetching Request Details</Typography>
        <Typography color="error">{error.message}</Typography>
      </Container>
    );
  }

  if (requestDetails.length === 0) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h4">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4">Request Details for Requestor ID {requestorid}</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {fields.map(field => (
                <TableCell key={field}>{field}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {requestDetails.map((request, index) => (
              <TableRow key={index}>
                {fields.map(field => (
                  <TableCell key={field}>{request[field]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default RequestOrderDetail;
