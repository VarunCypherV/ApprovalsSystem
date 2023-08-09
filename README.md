# ApprovalsSystem 
A Both Client and Server build using the following stack

MERN + AXIOS RESTFUL API

Node Modules : npm i
Material UI : npm install @mui/material @emotion/react @emotion/styled styled-components
React-Router-Dom npm install react-router-dom
Express-Mongoose-BodyParser and Axios : npm install express mongoose body-parser ejs axios
Nodemailer (email notif) : npm install nodemailer

Spin up two terminals and cd into approvalsystem in one and server in another
Run npm start to fire up our website and nodemon app.js to fire up the server in their respective terminals
Note : The Server runs in localhost 5000 and the website runs in localhost 3000

Backend Collection Example (one of each collection) : 
reqs : to handle requests 
{
    "_id" : ObjectId("64d23e9d12b4bebdc7a2dece"),
    "workflowId" : NumberInt(45),
    "status" : "Approved",
    "timestamp" : ISODate("2023-08-08T13:09:49.163+0000"),
    "NoOfApprovals" : NumberInt(1),
    "reqid" : NumberInt(999),
    "attachment" : null,
    "requestorid" : NumberInt(123),
    "email" : "123@gmail.com"
}
logins : To handle logins
{
    "_id" : ObjectId("64d23c5312b4bebdc7a2decb"),
    "userId" : NumberInt(1234),
    "password" : NumberInt(1234),
    "role" : "adminstrator"
}
workflows : To handle workfows
{
    "_id" : ObjectId("64d3462d5f12acaab07af6c1"),
    "workflowId" : NumberInt(456),
    "workflowIdName" : "Support",
    "approvalType" : "Anyone",
    "ApproverIds" : [
        NumberInt(12),
        NumberInt(13),
        NumberInt(45)
    ],
    "__v" : NumberInt(0)
}

Material UI is an amazing way to write css making the code look a lot cleaner and helps code resusability 
Since we arent using NextJs which takes care of routing through directory arrangement we are opting for react-router-dom and will be using
browserRouter , Routes , Route etc to fill that void along with useNavigation 
Express and brothers acts as our backend server while our database is mongodb run on its mongoose framework
I did Use robo3T / Studio3T as its call now , for better visualization of whats lying in the back (database)
Axios reduces the codelines and makes the coding part easier and more understandable and is said to be more capable as well
So i have given a small brief about the project stack idea 

Enjoy experiencing it
Have a good day!
