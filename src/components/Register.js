import React, { useState } from "react";
import "../styles/pages/login.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  
  function validateForm() {
    return email.length > 0 && password.length > 0 && username.length > 0;
  }

  function checkEmail(Email){
    setEmail(Email);
    if(Email === ''){
      setEmailMessage("Email cann't be empty.");
      return
    }
    axios
      .get(process.env.REACT_APP_BACKEND_URL + '/users?email=' + Email)
      .then(response => {
        var check = response.data.length;
        if(check === 0){
          setCheck(true);
          setEmailMessage("");
          return
        }
        setCheck(false);
        setEmailMessage("Email has been used!");
        return
      })
      .catch(error => {
        // Handle error.
        alert('email or password wrong, please check again!!!');
        console.log('An error occurred:', error.response);
      });
  };

  function checkUsername(Username){
    setUsername(Username);
    if(Username === ''){
      setUsernameMessage("Username cann't be empty.");
      return
    }
    axios
      .get(process.env.REACT_APP_BACKEND_URL + '/users?username=' + Username)
      .then(response => {
        var check = response.data.length;
        if(check === 0){
          setCheck(true);
          setUsernameMessage("");
          return
        }
        setCheck(false);
        setUsernameMessage("Username has been used!");
        return
      })
      .catch(error => {
        // Handle error.
        alert('email or password wrong, please check again!!!');
        console.log('An error occurred:', error.response);
      });
  };

  function handleSubmit(event) {
    event.preventDefault();
    if(check){
      axios
        .post(process.env.REACT_APP_BACKEND_URL + '/users', {
          email: email,
          username: username,
          password: password,
        })
        .then(response => {
          window.location.href="/login";
        })
        .catch(error => {
          // Handle error.
          alert('email or password wrong, please check again!!!');
          console.log('An error occurred:', error.response);
        });
      return;
    }
    alert('Email or username have been use, please change!!!');
    return;
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => checkEmail(e.target.value)}
          />
          <span id={'check Email'} style={{color:'red'}}> {emailMessage}  </span>
        </Form.Group>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => checkUsername(e.target.value)}
          />
          <span id={'check Username'} style={{color:'red'}}> {usernameMessage}  </span>
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Register
        </Button>
        <br />
        <Link to="/login">
          <Button block size="lg">
            Login
          </Button>
        </Link>
      </Form>
    </div>
  );
}