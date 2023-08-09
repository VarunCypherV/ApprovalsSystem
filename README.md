# ApprovalsSystem

Both Client and Server are built using the following stack:

**##MERN + AXIOS RESTFUL API**
- Node Modules: `npm i`
- Material UI: `npm install @mui/material @emotion/react @emotion/styled styled-components`
- React-Router-Dom: `npm install react-router-dom`
- Express-Mongoose-BodyParser and Axios: `npm install express mongoose body-parser ejs axios`
- Nodemailer (email notifications): `npm install nodemailer`


**Execution**

-Spin up two terminals and `cd` into `approvalsystem` in one and `server` in another.  
-Run `npm start` to launch the website and `nodemon app.js` to start the server in their respective terminals.  
-Note: The Server runs on localhost:5000, and the website runs on localhost:3000.  

**Backend Collection Example (one of each collection):**

**reqs:** to handle requests
```json
{
    "_id": ObjectId("64d23e9d12b4bebdc7a2dece"),
    "workflowId": NumberInt(45),
    "status": "Approved",
    "timestamp": ISODate("2023-08-08T13:09:49.163+0000"),
    "NoOfApprovals": NumberInt(1),
    "reqid": NumberInt(999),
    "attachment": null,
    "requestorid": NumberInt(123),
    "email": "123@gmail.com"
}
```

**logins:** to handle logins
```json
{
    "_id": ObjectId("64d23c5312b4bebdc7a2decb"),
    "userId": NumberInt(1234),
    "password": NumberInt(1234),
    "role": "adminstrator"
}
```

**workflows:** to handle workflows
```json{
    "_id": ObjectId("64d3462d5f12acaab07af6c1"),
    "workflowId": NumberInt(456),
    "workflowIdName": "Support",
    "approvalType": "Anyone",
    "ApproverIds": [
        NumberInt(12),
        NumberInt(13),
        NumberInt(45)
    ],
    "__v": NumberInt(0)
}
```

Material UI is an excellent way to write CSS, making the code look cleaner and promoting code reusability. Since Next.js isn't used for routing, react-router-dom is chosen, utilizing BrowserRouter, Routes, Route, etc. Express serves as the backend server, while MongoDB with Mongoose is used for the database. Robo3T (Studio3T) is used for better database visualization. Axios simplifies HTTP requests.

