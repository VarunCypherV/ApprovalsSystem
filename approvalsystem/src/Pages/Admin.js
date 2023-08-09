import React from "react";
import WorkflowForm from "../Components/workflowForm";
import DashboardAdmin from "../Components/dashboard.Admin";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const AdminContainer = styled.div`
   background: linear-gradient(to bottom, white,#fa5768, red, #fa5768, white);
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
   margin-left: 2px;
`;


const Admin = () => {
  const navigate = useNavigate();
  const handleGoToAudit = () => {
    navigate("/audit"); 
  };
  const handleGoToLogin = () => {
    navigate("/Login"); 
  };
  return (
    <AdminContainer>
        <WorkflowForm />
        <DashboardAdmin/>
        <StyledButton onClick={handleGoToAudit}>Go to Audit</StyledButton>
        <StyledButton onClick={handleGoToLogin}>Logout</StyledButton>
    </AdminContainer>
  );
};

export default Admin;
