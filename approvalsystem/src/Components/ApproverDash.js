import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ApproverDashboard = (props) => {
  const [userWorkflows, setUserWorkflows] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const userId = props.userId; // Assuming you're passing the user ID as a prop

  useEffect(() => {
    const fetchUserWorkflows = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/workflows`);
        setUserWorkflows(response.data.filter(workflow => workflow.ApproverIds.includes(userId)));
      } catch (error) {
        console.error('Error fetching user workflows:', error);
      }
    };

    fetchUserWorkflows();
  }, [userId]);

  useEffect(() => {
    const fetchFilteredRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/reqs`);
        const filteredReqs = response.data.filter(req => {
          const workflowIds = userWorkflows.map(workflow => workflow.workflowId);
          return (
            workflowIds.includes(req.workflowId) &&
            req.status !== 'Approved' &&
            req.status !== 'Rejected'
          );
        });
        setFilteredRequests(filteredReqs);
      } catch (error) {
        console.error('Error fetching filtered requests:', error);
      }
    };

    if (userWorkflows.length > 0) {
      fetchFilteredRequests();
    }
  }, [userWorkflows]);


  return (
    <Container maxWidth="lg">
      <Typography variant="h4">Requests for Approval</Typography>
      <TableContainer component={Paper}>
        <Table>
          {/* Render the table headers here */}
          <TableBody>
            {filteredRequests.map((request, index) => (
              <TableRow key={index}>
                {/* Render the table cells with request details */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ApproverDashboard;
