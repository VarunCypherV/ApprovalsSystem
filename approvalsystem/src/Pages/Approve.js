import React from 'react';
import ApproverDashboard from '../Components/ApproverDash';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
const PageContainer = styled.div`
  background: whitesmoke; /* Mix of whitesmoke and red */ /* Light gray background */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 50px;
`;

const Approve = () => {
  const navigate = useNavigate();
  const handleGoToLogin = () => {
    navigate("/Login"); 
  };
  let userId = sessionStorage.getItem("userId"); // Use a consistent key
  return (
    <PageContainer>
      <ContentContainer>
        <ApproverDashboard userId={userId}/>
        <StyledButton onClick={handleGoToLogin}>Logout</StyledButton>
      </ContentContainer>
    </PageContainer>
  );
}

export default Approve;
