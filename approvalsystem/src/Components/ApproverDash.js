import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import styled from "styled-components";


const StyledContainer = styled(Container)`
  background: linear-gradient(to bottom, #990000, #ff6666); /* Darker red gradient */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h4 {
    font-size: 24px;
    margin-bottom: 20px;
    color: white;
  }
`;

const StyledTableContainer = styled(TableContainer)`
  background-color: white;
  border-radius: 8px;
`;

const StyledTable = styled(Table)`
  border-collapse: collapse;
`;

const StyledTableCell = styled(TableCell)`
  border: 1px solid #ccc;
  padding: 8px;
  font-size: 14px;
`;

const StyledSelect = styled.select`
  background-color: white;
  border: 1px solid #ccc;
  padding: 4px 8px;
  font-size: 14px;
  border-radius: 4px;
`;

const ApproverDashboard = (props) => {
  const [filteredRequests, setFilteredRequests] = useState([]);
  const userId = props.userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workflowsResponse = await axios.get(
          "http://localhost:5000/workflows"
        );
        const requestsResponse = await axios.get("http://localhost:5000/reqs");
        const userWorkflows = workflowsResponse.data.filter((workflow) =>
          workflow.ApproverIds.includes(parseInt(userId))
        );
        const filteredReqs = requestsResponse.data.filter((req) => {
          return (
            userWorkflows.some(
              (workflow) => workflow.workflowId === req.workflowId
            ) &&
            req.status !== "Approved" &&
            req.status !== "Rejected"
          );
        });
        const sortedReqs = filteredReqs.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setFilteredRequests(sortedReqs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userId,filteredRequests]);

  const handleStatusUpdate = async (reqid, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/reqs/${reqid}?newStatus=${newStatus}`
      );
      
      const updatedRequests = filteredRequests.map((req) => {
        if (req.reqid === reqid) {
          req.status = newStatus;
        }
        return req;
      });
      setFilteredRequests(updatedRequests);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <StyledContainer maxWidth="lg">
      <Typography variant="h4">Requests for Approval</Typography>
      <StyledTableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableCell>Requestor ID</StyledTableCell>
              <StyledTableCell>Workflow ID</StyledTableCell>
              <StyledTableCell>Request ID</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>No Of Approvals</StyledTableCell>
              <StyledTableCell>TimeStamp</StyledTableCell>
              <StyledTableCell>Attachment</StyledTableCell>
            
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredRequests.map((request, index) => (
              <TableRow key={index}>
                <StyledTableCell>{request.requestorid}</StyledTableCell>
                <StyledTableCell>{request.workflowId}</StyledTableCell>
                <StyledTableCell>{request.reqid}</StyledTableCell>
                <StyledTableCell>
                  {request.status === "ReadyForReview" ? (
                    <StyledSelect
                      value={request.status}
                      onChange={(e) =>
                        handleStatusUpdate(request.reqid, e.target.value)
                      }
                    >
                      <option value="ReadyForReview">ReadyForReview</option>
                      <option value="Approved">Approve</option>
                      <option value="Rejected">Reject</option>
                      <option value="Justification">Justification</option>
                    </StyledSelect>
                  ) : (
                    request.status
                  )}
                </StyledTableCell>
                <StyledTableCell>{request.NoOfApprovals}</StyledTableCell>
                <StyledTableCell>{request.timestamp}</StyledTableCell>
                <StyledTableCell>
                  {request.attachment === null ? (
                    "nill"
                  ) : (
                    <a href={request.attachment} download>
                      Download Attachment
                    </a>
                  )}
                </StyledTableCell>
              
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </StyledContainer>
  );
};


export default ApproverDashboard;


