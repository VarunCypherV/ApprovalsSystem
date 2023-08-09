import React from 'react';
import RequestForm from '../Components/requestForm';
import RequestOrderDetail from '../Components/RequesterDetail';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
const PageContainer = styled.div`
  background-color: #ff6666;
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
const Request = ()=> {
  const navigate = useNavigate();
  const handleGoToLogin = () => {
    navigate("/Login"); 
  };
 let requestorid = sessionStorage.getItem("userId"); 
  return (
    <PageContainer>
        <RequestForm  requestoridz={requestorid}/>
   
        <RequestOrderDetail requestoridz={requestorid}/>
        <StyledButton onClick={handleGoToLogin}>Logout</StyledButton>
    </PageContainer>
  );
}

export default Request;
