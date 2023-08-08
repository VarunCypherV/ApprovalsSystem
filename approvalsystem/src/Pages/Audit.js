import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Audit = () => {
  const [auditData, setAuditData] = useState([]);

  useEffect(() => {
    // Fetch audit data from the provided API endpoint
    axios.get('http://localhost:5000/reqs') // Change the URL to your API endpoint
      .then(response => {
        // Filter the audit data to include only "Approved" or "Rejected" status
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
        <Table>
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
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Audit;
