import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom, white, #ffcccc);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 50px;

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #ff0000;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .MuiFormControl-root {
      margin-bottom: 20px;
    }

    .MuiSelect-selectMenu {
      background-color: white;
    }

    .MuiInputLabel-root {
      color: #ff0000;
    }

    .MuiInputLabel-root.Mui-focused {
      color: #ff0000;
    }

    .MuiInput-underline:before {
      border-bottom: 2px solid #ff0000;
    }

    .MuiInput-underline.Mui-error:after {
      border-bottom: 2px solid #ff0000;
    }

    input[type='file'] {
      margin-top: 8px;
    }

    .MuiButton-containedPrimary {
      background-color: #ff0000 !important;
      color: white !important;
      margin-top: 20px;
    }
  }
`;

const RequestForm = (props) => {
  const requestorid = props.requestoridz;
  const [workflowNames, setWorkflowNames] = useState([]);
  const [workflowIds, setWorkflowIds] = useState([]);
  const [selectedWorkflowName, setSelectedWorkflowName] = useState('');
  const [selectedWorkflowId, setSelectedWorkflowId] = useState('');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState(null);
  
  useEffect(() => {
    axios.get('http://localhost:5000/workflows')
      .then(response => {
        // Extract unique workflow names
        const uniqueWorkflowNames = [...new Set(response.data.map(workflow => workflow.workflowName))];
        setWorkflowNames(uniqueWorkflowNames);
        const uniqueWorkflowIds = [...new Set(response.data.map(workflow => workflow.workflowId))];
        setWorkflowIds(uniqueWorkflowIds);
      })
      .catch(error => {
        console.error('Error fetching workflow names:', error);
      });
  }, []);

  const handleWorkflowNameChange = (event) => {
    setSelectedWorkflowName(event.target.value);
   
  };
  const handleWorkflowIdChange = (event) => {
    setSelectedWorkflowId(event.target.value);

  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
   
  };

  const handleAttachmentsChange = (event) => {
    setAttachments(event.target.files[0]);
    
  };
  function generateRandomNumber() {
    const min = 1;
    const max = 100000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  console.log(selectedWorkflowId,selectedWorkflowName,description,attachments);
  const handleSubmit = event => {
    event.preventDefault();

    const formData = new FormData();
    const randomNo = generateRandomNumber();
    formData.append('description', description);
    formData.append('attachments', attachments);
    formData.append('workflowId', selectedWorkflowId);
    formData.append('reqid', randomNo); 
    formData.append('requestorid', requestorid); 
    formData.append('email', String(requestorid)+'@gmail.com'); 
    

    axios.post('http://localhost:5000/reqs', formData)
      .then(response => {
        console.log('Request submitted successfully:', response.data);
        setSelectedWorkflowName('');
        setSelectedWorkflowId('');
        setDescription('');
        setAttachments(null);
      })
      .catch(error => {
        console.error('Error submitting request:', error);
      });
  };

  return (
    <StyledContainer maxWidth="sm">
      <h2>Request Workflow</h2>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel id="workflowName-label">Select Workflow Type</InputLabel>
          <Select
            labelId="workflowName-label"
            id="workflowName"
            value={selectedWorkflowName}
            onChange={handleWorkflowNameChange}
            required
          >
            <MenuItem value="">
              <em>Select Workflow</em>
            </MenuItem>
            {workflowNames.map(workflowName => (
              <MenuItem key={workflowName} value={workflowName}>
                {workflowName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="workflowId-label">Select Workflow Id</InputLabel>
          <Select
            labelId="workflowId-label"
            id="workflowId"
            value={selectedWorkflowId}
            onChange={handleWorkflowIdChange}
            required
          >
            <MenuItem value="">
              <em>Select Workflow</em>
            </MenuItem>
            {workflowIds.map(workflowId => (
              <MenuItem key={workflowId} value={workflowId}>
                {workflowId}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Add Description"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          fullWidth
          required
          multiline
        />
        <div>
        
          <input type="file" id="attachments" onChange={handleAttachmentsChange} />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      </StyledContainer>
  );
};

export default RequestForm;
