import React from 'react';
import ApproverDashboard from '../Components/ApproverDash';

const Approve = ()=> {
  let userId = sessionStorage.getItem("userId"); // Use a consistent key
  return (
    <div>
        <ApproverDashboard userId={userId}/>
    </div>
  );
}

export default Approve;
