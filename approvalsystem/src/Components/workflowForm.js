import React, { useState } from 'react';
import axios from 'axios';

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
    } catch (error) {
      console.error('Error creating workflow:', error);
    }
  };

  return (
    <div>
      <h2>Create New Workflow</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Workflow ID:
          <input
            type="number"
            value={workflowId}
            onChange={(e) => setWorkflowId(e.target.value)}
          />
        </label>
        <br />
        <label>
          Workflow ID Name:
          <input
            type="text"
            value={workflowIdName}
            onChange={(e) => setWorkflowIdName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Approval Type:
          <input
            type="text"
            value={approvalType}
            onChange={(e) => setApprovalType(e.target.value)}
          />
        </label>
        <br />
        <label>
          Approver IDs (comma-separated):
          <input
            type="text"
            value={approverIds}
            onChange={(e) => setApproverIds(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create Workflow</button>
      </form>
    </div>
  );
};

export default WorkflowForm;
