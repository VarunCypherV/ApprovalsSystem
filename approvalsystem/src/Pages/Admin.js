import React from "react";
import WorkflowForm from "../Components/workflowForm";
import DashboardAdmin from "../Components/dashboard.Admin";

const Admin = () => {
  return (
    <div>
      <div>
        <WorkflowForm />
      </div>
      <div>
        <DashboardAdmin/>
      </div>
    </div>
  );
};

export default Admin;
