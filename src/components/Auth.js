import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store/index.js";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Auth = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSignup, setIsSignup] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`https://blogweb-node.herokuapp.com/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => navigate("/"))
        .then((data) => console.log(data));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => navigate("/"))
        .then((data) => console.log(data));
    }
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit}>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h4"
            style={{ padding: "1rem", textAlign: "center" }}
          >
            {!isSignup ? "Login" : "Signup"}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="Name"
              margin="normal"
              required
            />
          )}{" "}
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type={"email"}
            placeholder="Email"
            margin="normal"
            required
          />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type={"password"}
            placeholder="Password"
            margin="normal"
            required
          />
          {!isSignup ? (
            <>
              <Button
                type="submit"
                variant="contained"
                style={{ borderRadius: "1rem", marginTop: "1rem" }}
                color="warning"
              >
                Login
              </Button>
              <Button
                style={{ marginTop: "1rem" }}
                onClick={() => setIsSignup(!isSignup)}
              >
                Don't have an account? Signup
              </Button>
            </>
          ) : (
            <>
              <Button
                type="submit"
                variant="contained"
                style={{ borderRadius: "1rem", marginTop: "1rem" }}
                color="warning"
              >
                Signup
              </Button>
              <Button
                style={{ marginTop: "1rem" }}
                onClick={() => setIsSignup(!isSignup)}
              >
                you have an account? login
              </Button>
            </>
          )}
        </Box>
      </form>
    </div>
  );
};

export default Auth;
