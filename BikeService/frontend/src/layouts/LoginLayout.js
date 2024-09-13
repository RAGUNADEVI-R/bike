import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function LoginLayout() {
  const navigate = useNavigate();
// Retrieve email from localStorage
// const email = localStorage.getItem('email');
const [email, setEmail] = useState('');
const [pass, setPassword] = useState('');
const handleSubmitLogin = (event) => {
  event.preventDefault();
  axios.post('http://localhost:8000/signin', { email, pass })
    .then(res => {
      console.log(res);
      // Store email in localStorage
      localStorage.setItem('email', email);
      // Check user credentials and navigate accordingly
      if (email === "udan.services3@gmail.com" && pass === "0") {
        navigate(`/starter`);
      } else {
        navigate(`/dash?email=${email}`);
      }
    })
    .catch(err => console.log(err));
}

const LoginNavigate = () => {
  navigate(`/register`);
}

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f2f2f2' }}>
        <Card style={{ width: '400px', margin: '0 10px' }}>
          <CardHeader>
            <h2><i className="fas fa-sign-in-alt"></i> Login</h2>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmitLogin}>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="username">Email Id</label>
                <input type="email" id="email" name="email" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} required 
                onChange={e => setEmail(e.target.value)}/>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="password">Password:</label>
                <input type="password" id="pass" name="pass" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} required
                onChange={e => setPassword(e.target.value)}/>
              </div>
              <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Login</button>
            </form>
          </CardBody>
          <CardFooter>
            <p>Don't have an account? <button  style={{ color: '#007bff', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }} onClick={LoginNavigate}>Register here</button></p>
          </CardFooter>
        </Card>        
      
    </div>
  );
}

export default LoginLayout;
