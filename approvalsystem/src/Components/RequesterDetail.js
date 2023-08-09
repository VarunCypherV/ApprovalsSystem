import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  background: linear-gradient(to bottom, white, #ffcccc);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h4 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #ff0000;
  }

  .MuiPaper-root {
    width: 100%;
    overflow: hidden;
    box-shadow: none;
    border: 1px solid #ccc;
  }

  .MuiTable-root {
    border-collapse: collapse;
  }

  .MuiTableCell-root {
    border: 1px solid #ccc;
    padding: 8px;
  }
`;
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
      <StyledContainer maxWidth="lg">
        <Typography variant="h4">Error Fetching Request Details</Typography>
        <Typography color="error">{error.message}</Typography>
      </StyledContainer>
    );
  }

  if (requestDetails.length === 0) {
    return (
      <StyledContainer maxWidth="lg">
           <Typography variant="h4">Loading...</Typography>
      </StyledContainer>
        
      
    );
  }

  return (
    <StyledContainer maxWidth="lg">
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
      </StyledContainer>
  );
};

export default RequestOrderDetail;
