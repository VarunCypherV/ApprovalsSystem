import React, { useState } from "react";
import { TextField, FormControlLabel, Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import styled from "styled-components";
import { RadioButtonUnchecked, CheckCircleOutline } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #c62828, #8e0000, #8e0000, #c62828);
`;
const Title = styled.h1`
  font-family: "Cursive"; /* Specify your custom font or font family here */
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 20px;
`;
const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

const CircleOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
`;

const LoginButton = styled(Button)`
  background-color: #e53935;
  color: #fff;

  &:hover {
    background-color: #c62828;
  }
`;

const SubHeading = styled.h2`
  color: #e53935;
  margin: 0;
`;

const LoginScreen = () => {
  const [role, setSelectedRole] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
 

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleSubmit = async () => {
    // Here you can send the selected role, user ID, and password to the backend
    try {
      console.log("Selected Role:", role);
      console.log("User ID:", userId);
      console.log("Password:", password);
      const response = await axios.get(
        `http://localhost:5000/logins/${userId}/${password}/${role}`
      );
      //console.log(response);
      if (response.status === 200 && response.data != null) {
        const data = response.data;
        console.log("Login successful:", data);
        if (data.role === "adminstrator") {
          navigate("/admin");
        } else if (data.role === "requester") {
          navigate("/request");
        } else if (data.role === "approver") {
          navigate("/approve");
        }
      } else {
        console.error("Login failed:", response.data.error);
        // Handle error message or other feedback to the user
      }
    } catch (error) {
      console.error("Request error:", error);
      // Handle error, like showing a network error to the user
    }
  };

  return (
    <Container>
      <Title>Approval System V1.0</Title>
      <LoginForm>
        <SubHeading>Login</SubHeading>
        <TextField
          label="Enter ID"
          variant="outlined"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <CircleOptions>
          <FormControlLabel
            control={
              <Checkbox
                value="adminstrator"
                checked={role === "adminstrator"}
                onChange={handleRoleChange}
                icon={<RadioButtonUnchecked />}
                checkedIcon={<CheckCircleOutline />}
              />
            }
            label="Adminstrator"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="approver"
                checked={role === "approver"}
                onChange={handleRoleChange}
                icon={<RadioButtonUnchecked />}
                checkedIcon={<CheckCircleOutline />}
              />
            }
            label="Approver"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="requester"
                checked={role === "requester"}
                onChange={handleRoleChange}
                icon={<RadioButtonUnchecked />}
                checkedIcon={<CheckCircleOutline />}
              />
            }
            label="Requester"
          />
        </CircleOptions>
        <LoginButton variant="contained" onClick={handleSubmit}>
          Login
        </LoginButton>
      </LoginForm>
    </Container>
  );
};

export default LoginScreen;
