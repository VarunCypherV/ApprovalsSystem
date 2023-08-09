import React from 'react';
import RequestForm from '../Components/requestForm';
import RequestOrderDetail from '../Components/RequesterDetail';


const Request = ()=> {
 let requestorid = sessionStorage.getItem("userId"); // Use a consistent key
  return (
    <div>
        <RequestForm/>
   
        <RequestOrderDetail requestoridz={requestorid}/>
    </div>
  );
}

export default Request;
