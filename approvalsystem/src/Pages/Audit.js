import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const ReddishWhiteTable = styled(Table)`
  background-color: #ff9999; 
`;
const StyledButton = styled.button`
   background-color: red;
   color: white;
   border: none;
   padding: 10px 20px;
   border-radius: 5px;
   cursor: pointer;
   margin-top: 20px;
   font-size: 16px;
   margin-bottom: 10%;
`;
const Audit = () => {
  const navigate = useNavigate();
  const handleGoToAdmin = () => {
    navigate("/admin"); 
  };
  const [auditData, setAuditData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/reqs')
      .then(response => {
        const filteredAuditData = response.data.filter(audit => audit.status === "Approved" || audit.status === "Rejected");
        setAuditData(filteredAuditData);
      })
      .catch(error => {
        console.error('Error fetching audit data:', error);
      });
  }, []);

  return (
    <Container maxWidth="lg">
      <h2>Audit Page</h2>
      <TableContainer component={Paper}>
        <ReddishWhiteTable>
          <TableHead>
            <TableRow>
              <TableCell>Request ID</TableCell>
              <TableCell>Workflow ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>No. of Approvals</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {auditData.map(audit => (
              <TableRow key={audit._id}>
                <TableCell>{audit.reqid}</TableCell>
                <TableCell>{audit.workflowId}</TableCell>
                <TableCell>{audit.status}</TableCell>
                <TableCell>{audit.NoOfApprovals}</TableCell>
                <TableCell>{new Date(audit.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ReddishWhiteTable>
      </TableContainer>
      <StyledButton onClick={handleGoToAdmin}>Admin</StyledButton>
    </Container>
  );
};

export default Audit;
