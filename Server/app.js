const express = require("express");
const bodyParser= require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const cors = require('cors');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//body parser to parse our requests
app.use(express.static("public"));
// public directory to store static part like images or css code

mongoose.connect("mongodb://localhost:27017/ApprovalSystem", {useNewUrlParser : true});

const loginSchema = {
    "userId" : Number,
    "password" : Number,
    "role" : String
}
const Login=mongoose.model("Login", loginSchema);



const reqsSchema = new mongoose.Schema({
  workflowId: Number,
  status: String,
  timestamp: Date, // Use Date data type for storing timestamps
  NoOfApprovals: Number,
  reqid: Number,
});

const Reqs = mongoose.model('Reqs', reqsSchema);

const workflowsSchema = {
    workflowId: Number,
    workflowIdName: String,
    approvalType: String,
    ApproverIds: [Number]
}
const Workflow=mongoose.model("Workflow", workflowsSchema);

// BEGINING OF THE API HIT URLS 

// All
app.route("/logins")
    .get(async function(req, res) {
    try {
        const foundLogins = await Login.find();
        res.json(foundLogins); // Sending the foundLogins as a JSON response
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
    })
    .post(async function (req, res) {
    try {
        const userId = req.query.userId;
        const password = req.query.password;
        const role = req.query.role;
        const newLogin = new Login({
            userId: userId,
            password: password,
            role: role
        });
        await newLogin.save();
        res.status(201).json({ message: "Login created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
    });
    


    ////////SPECIFIC

    app.route("/logins/:userId/:password/:role")
    .get(async function (req, res) {
        try {
            const userId = req.params.userId;
            const password = req.params.password;
            const role = req.params.role;
            const foundLogins = await Login.findOne({ userId:userId, password: password,role:role });
            res.json(foundLogins);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    })
    //put with $set is essentially patch
   // commented is put original
    // .put(async function (req, res) {
    //     try {
    //         const userId = parseInt(req.params.userId);
    //         const password = parseInt(req.params.password);
    //         const role = req.params.role;
    //         const { newpassword, newrole } = req.query; // Extract new password and role

    //         await Login.updateOne(
    //             { userId: userId, password: password, role: role }, // Find the document
    //             { userId: userId, password: newpassword, role: newrole } // Replace with new values
    //         );

    //         res.json({ message: "Login replaced successfully" });
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).json({ error: "Internal Server Error" });
    //     }
    // });
    //put with set begins
    .put(async function (req, res) {
        try {
            const userId = parseInt(req.params.userId);
            const password = parseInt(req.params.password);
            const role = req.params.role;
            const newPassword = req.query.newpassword;

            await Login.updateOne(
                { userId: userId, password: password, role: role },
                { $set: { password: newPassword } },
                { overwrite: true } 
            );

            res.json({ message: "Login updated successfully" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    })
    .patch(async function (req, res) {
        try {
            const userId = req.params.userId;
            const updateFields = req.query;
            await Login.updateOne(
                //{ userId: userId },
                {password: req.params.password},
                { $set: updateFields }
            );
            console.log(updateFields);
            res.json({ message: "Login updated successfully" });
        } catch(err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    })
    .delete(async function(req,res){
        try{
           await Login.deleteOne(
            {userId: req.params.userId},
        );
        res.json({message:"Deleted Successfully"});
        }catch(err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
    }
});
    

app.route("/workflows")
.post(async function (req, res) {
    try {
        const workflowId = req.query.workflowId;
        const workflowIdName = req.query.workflowIdName;
        const approvalType = req.query.approvalType;
        const rawApproverIds = req.query.ApproverIds;
        // Remove any spaces and brackets from the input
        const cleanedApproverIds = rawApproverIds.replace(/\s/g, '').replace(/\[|\]/g, '');
        // Split the cleaned input into an array of strings
        const approverIdStrings = cleanedApproverIds.split(',');

        // Map the strings to integers, filtering out any NaN values
        const ApproverIds = approverIdStrings.map(Number).filter(id => !isNaN(id));

        const newWorkflow = new Workflow({
            workflowId: workflowId,
            workflowIdName: workflowIdName,
            approvalType: approvalType,
            ApproverIds: ApproverIds,
        });

        await newWorkflow.save();
        res.status(201).json({ message: "Workflow created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})
.get(async function(req, res) {
    try {
        const foundwf = await Workflow.find();
        res.json(foundwf); // Sending the foundLogins as a JSON response
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
    });


    app.get('/reqs', async (req, res) => {
        try {
          const reqssData = await Reqs.find(); // Fetch all documents from the collection
          res.json(reqssData);
        } catch (error) {
          res.status(500).json({ error: 'Error fetching data' });
        }
      });

    //   app.get('/reqs/:reqid', async (req, res) => {
    //     try {
    //     const reqid=req.params.reqid;
    //       const reqssData = await Reqs.findOne({reqid:reqid}); // Fetch all documents from the collection
    //       res.json(reqssData);
    //     } catch (error) {
    //       res.status(500).json({ error: 'Error fetching data' });
    //     }
    //   });

      app.get('/reqs/:requesterid', async (req, res) => {
        try {
        const requestorid=parseInt(req.params.requesterid);
          const reqsData = await Reqs.find({requestorid:requestorid}); // Fetch all documents from the collection
          res.json(reqsData);
        } catch (error) {
          res.status(500).json({ error: 'Error fetching data' });
        }
      });
   
         



app.listen(5000,function(){
    console.log('server started on port 5000');
})

