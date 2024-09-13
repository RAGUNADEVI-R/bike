import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import { useNavigate } from "react-router-dom";

function RegisterLayout() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
      name: '',
      phone: '',
      email: '',
      pass: '',
    });
  
    const handleChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://localhost:8000/login', values)
        .then((res) => {
          resetFields();
          sendConfirmationEmail(values.email); // Call function to send confirmation email
          console.log("Registered Successfully");
          // Navigate to the dashboard on successful registration
        })
        .catch((err) => console.log(err));
    };
  
    const sendConfirmationEmail = (email) => {
      const emailData = {
        to: email,
        subject: ' Registration Process Completed Successfully',
        text: "We are delighted to inform you that your registration process with Udan Services has been successfully completed. Your account is now active and ready to use.To access our platform and start enjoying our services, please visit our login page.Once logged in, you will have full access to all the features and functionalities available on our website.   If you have any questions or encounter any issues during the login process, please feel free to contact our support team at udan.services3@gmail.com. We are here to assist you every step of the way.Thank you for choosing Udan Services. We look forward to serving you and providing you with an exceptional experience. Best regards,Udan Services"
      };
  
      axios.post('http://localhost:8000/send-email', emailData)
        .then((res) => console.log("Confirmation email sent successfully"))
        .catch((err) => console.log("Error sending confirmation email:", err));
    };
  
    const resetFields = () => {
      setValues({
        name: '',
        phone: '',
        email: '',
        pass: '',
      });
    };

    const RegisterNavigate = () => {
        navigate(`/`);
      }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f2f2f2' }}>
      <Card style={{ width: '400px', margin: '0 10px' }}>
        <CardHeader>
          <h2><i className="fas fa-user-plus"></i> Register</h2>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} 
              value={values.name}
              onChange={handleChange}
              required />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input type="tel" id="phone" name="phone" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} 
              value={values.phone}
              onChange={handleChange}
              required />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
              value={values.email}
              onChange={handleChange}
              required />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="password">Password:</label>
              <input type="password" id="pass" name="pass" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
              value={values.pass}
              onChange={handleChange}
              required />
            </div>
            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>
            Register
            </button>
          </form>
        </CardBody>
        <CardFooter>
          <p>Already have an account? <button  style={{ color: '#007bff', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }} onClick={RegisterNavigate}>Sign in</button></p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default RegisterLayout;
