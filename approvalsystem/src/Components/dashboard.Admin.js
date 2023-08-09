import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import styled from 'styled-components';

const DashboardContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid pink;
  box-shadow: 2px 2px 2px 2px rgba(0.2, 0.2, 0.2, 0.2);;
  padding: 20px;
  background: white;
  max-width: 30%;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom:50px;

  & > div {
    margin-bottom: 20px;

    h3 {
      font-size: 20px;
      margin-bottom: 10px;
    }

    p {
      font-size: 16px;
    }
  }
`;

const DashboardAdmin = () => {
  const [pendingWorkflows, setPendingWorkflows] = useState(0);
  const [approvedThisMonth, setApprovedThisMonth] = useState(0);
  const [approvedThisWeek, setApprovedThisWeek] = useState(0);
  const [approvedToday, setApprovedToday] = useState(0);
  const [rejectedThisMonth, setRejectedThisMonth] = useState(0);
  const [rejectedThisWeek, setRejectedThisWeek] = useState(0);
  const [rejectedToday, setRejectedToday] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/reqs');
      const requestList = response.data;

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentWeek = Math.floor((currentDate.getDate() - 1) / 7);

      const pending = requestList.filter(request => request.status !== 'Approved' && request.status !== 'Rejected');
      const approvedThisMonth = requestList.filter(request =>
        request.status === 'Approved' && new Date(request.timestamp).getMonth() === currentMonth
      );
      const approvedThisWeek = requestList.filter(request =>
        request.status === 'Approved' && Math.floor((new Date(request.timestamp).getDate() - 1) / 7) === currentWeek
      );
      const approvedToday = requestList.filter(request =>
        request.status === 'Approved' && isToday(new Date(request.timestamp))
      );
      const rejectedThisMonth = requestList.filter(request =>
        request.status === 'Rejected' && new Date(request.timestamp).getMonth() === currentMonth
      );
      const rejectedThisWeek = requestList.filter(request =>
        request.status === 'Rejected' && Math.floor((new Date(request.timestamp).getDate() - 1) / 7) === currentWeek
      );
      const rejectedToday = requestList.filter(request =>
        request.status === 'Rejected' && isToday(new Date(request.timestamp))
      );

      setPendingWorkflows(pending.length);
      setApprovedThisMonth(approvedThisMonth.length);
      setApprovedThisWeek(approvedThisWeek.length);
      setApprovedToday(approvedToday.length);
      setRejectedThisMonth(rejectedThisMonth.length);
      setRejectedThisWeek(rejectedThisWeek.length);
      setRejectedToday(rejectedToday.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <DashboardContainer>
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Total Number of Pending Workflows: {pendingWorkflows}</h3>
      </div>
      <div>
        <h3>Approved:</h3>
        <p>This Month: {approvedThisMonth}</p>
        <p>This Week: {approvedThisWeek}</p>
        <p>Today: {approvedToday}</p>
      </div>
      <div>
        <h3>Rejected:</h3>
        <p>This Month: {rejectedThisMonth}</p>
        <p>This Week: {rejectedThisWeek}</p>
        <p>Today: {rejectedToday}</p>
      </div>
    </DashboardContainer>
  );
};

export default DashboardAdmin;
