import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const RequestForm = () => {
  const [workflowNames, setWorkflowNames] = useState([]);
  const [selectedWorkflowName, setSelectedWorkflowName] = useState('');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/workflows')
      .then(response => {
        // Extract unique workflow names
        const uniqueWorkflowNames = [...new Set(response.data.map(workflow => workflow.workflowName))];
        setWorkflowNames(uniqueWorkflowNames);
      })
      .catch(error => {
        console.error('Error fetching workflow names:', error);
      });
  }, []);

  const handleWorkflowNameChange = event => {
    setSelectedWorkflowName(event.target.value);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  const handleAttachmentsChange = event => {
    setAttachments(event.target.files[0]);
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Prepare data for the POST request
    const formData = new FormData();
    formData.append('workflowName', selectedWorkflowName);
    formData.append('description', description);
    formData.append('attachments', attachments);

    // Make POST request to save form data
    axios.post('http://localhost:5000/reqss', formData)
      .then(response => {
        console.log('Request submitted successfully:', response.data);
        // Reset form fields
        setSelectedWorkflowName('');
        setDescription('');
        setAttachments(null);
      })
      .catch(error => {
        console.error('Error submitting request:', error);
      });
  };

  return (
    <Container maxWidth="sm">
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
          <InputLabel htmlFor="attachments">Add Attachments</InputLabel>
          <input type="file" id="attachments" onChange={handleAttachmentsChange} />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default RequestForm;
