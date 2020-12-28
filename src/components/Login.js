import React, { useState } from "react";
import "../styles/pages/login.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(process.env.REACT_APP_BACKEND_URL + '/auth/local', {
        identifier: email,
        password: password,
      })
      .then(response => {
        Cookie.set("username",response.data.user.username)
        Cookie.set("token",response.data.jwt);
        Cookie.set("role",response.data.user.role.name)
        if(Cookie.get("role") === 'Admin'){
          window.location.href="/admin";
        }
        else{
          window.location.href="/";
        }
      })
      .catch(error => {
        alert('email or password wrong, please check again!!!');
        console.log('An error occurred:', error.response);
      });
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
            onChange={(e) => setEmail(e.target.value)}
          />
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
          Login
        </Button>
        <br />
        <Link to="/register">
          <Button block size="lg">
            Register
          </Button>
        </Link>
      </Form>
    </div>
  );
}