import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField } from '@mui/material';
import styled from 'styled-components';

const MainBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid pink;
  box-shadow: 2px 2px 2px 2px rgba(0.2, 0.2, 0.2, 0.2);;
  padding: 20px;
  background: white;
  max-width: 400px;
  margin: 0 auto;
  margin-top: 50px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const SubmitButton = styled(Button)`
  background-color: palevioletred !important;
  color: white !important;
  font-size: 16px !important;
`;

const WorkflowForm = () => {
  const [workflowId, setWorkflowId] = useState('');
  const [workflowIdName, setWorkflowIdName] = useState('');
  const [approvalType, setApprovalType] = useState('');
  const [approverIds, setApproverIds] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/workflows', null, {
        params: {
          workflowId: workflowId,
          workflowIdName: workflowIdName,
          approvalType: approvalType,
          ApproverIds: approverIds,
        },
      });

      console.log('Workflow created successfully:', response.data);
      alert('Workflow created successfully');
    } catch (error) {
      console.error('Error creating workflow:', error);
      alert('Error');
    }
  };

  return (
    <MainBox>
      <Title>Create New Workflow</Title>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <Label>Workflow ID:</Label>
          <TextField
            type="number"
            value={workflowId}
            onChange={(e) => setWorkflowId(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Label>Workflow ID Name:</Label>
          <TextField
            type="text"
            value={workflowIdName}
            onChange={(e) => setWorkflowIdName(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Label>Approval Type:</Label>
          <TextField
            type="text"
            value={approvalType}
            onChange={(e) => setApprovalType(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Label>Approver IDs (, separated):</Label>
          <TextField
            type="text"
            value={approverIds}
            onChange={(e) => setApproverIds(e.target.value)}
          />
        </InputContainer>
        <SubmitButton variant="contained" type="submit">
          Create Workflow
        </SubmitButton>
      </form>
    </MainBox>
  );
};

export default WorkflowForm;
