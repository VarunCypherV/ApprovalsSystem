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
  }, [userId]);

  const handleStatusUpdate = async (reqid, newStatus) => {
    try {
      await axios.put(
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
    <Container maxWidth="lg">
      <Typography variant="h4">Requests for Approval</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Requestor ID</TableCell>
              <TableCell>Workflow ID</TableCell>
              <TableCell>Request ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>No Of Approvals</TableCell>
              <TableCell>TimeStamp</TableCell>
              <TableCell>Attachment</TableCell>
              {/* Add other header cells as needed */}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredRequests.map((request, index) => (
              <TableRow key={index}>
                <TableCell>{request.requestorid}</TableCell>
                <TableCell>{request.workflowId}</TableCell>
                <TableCell>{request.reqid}</TableCell>
                <TableCell>
                  {request.status === "ReadyForReview" ? (
                    <select
                      value={request.status}
                      onChange={(e) =>
                        handleStatusUpdate(request.reqid, e.target.value)
                      }
                    >
                      <option value="ReadyForReview">ReadyForReview</option>
                      <option value="Approved">Approve</option>
                      <option value="Rejected">Reject</option>
                      <option value="Justification">Justification</option>
                    </select>
                  ) : (
                    request.status
                  )}
                </TableCell>
                <TableCell>{request.NoOfApprovals}</TableCell>
                <TableCell>{request.timestamp}</TableCell>
                <TableCell>
                  {request.attachment === null ? (
                    "nill"
                  ) : (
                    <a href={request.attachment} download>
                      Download Attachment
                    </a>
                  )}
                </TableCell>
                {/* Add other cells for additional details */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ApproverDashboard;
