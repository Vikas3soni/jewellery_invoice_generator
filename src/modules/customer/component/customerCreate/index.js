import React, { useState } from 'react';
import './CreateCustomerPage.css'; // Import your CSS file
import axios from 'axios';
import { Button, TextField, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function CreateCustomerPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [mailAddressLine1, setMailAddressLine1] = useState('');
  const [mailAddressLine2, setMailAddressLine2] = useState('');
  const [mailCity, setMailCity] = useState('');
  const [email, setEmail] = useState('');
  const { user }= useAuth0();
  const navigate = useNavigate(); // Initialize useNavigate
  const ip='dev.sunarms.co.in';
  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerData = {
      mail_address_line_1: mailAddressLine1,
      mail_address_line_2: mailAddressLine2,
      mail_city: mailCity,
      name: name,
      phone: phone,
      email: email,
      jeweller_id: `${user.nickname}` // this is strickly jeweller
    };

    try {
      const ip ='dev.sunarms.co.in';
      const response = await axios.post(`https://${ip}/create_customers`, customerData);
      console.log('Customer created successfully:', response.data);

      // Reset the form fields after successful submission
      setMailAddressLine1('');
      setMailAddressLine2('');
      setMailCity('');
      setName('');
      setPhone('');
      setEmail('');

      // Navigate to the customer list page
      navigate("/customers-page");

      // Show a success message (you can implement this as needed)
      alert('Customer created successfully');
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  return (
    <div className='root'>
    <div className="invoiceForm">
      <Typography variant="h6" sx={{ mb: 2 }}>
        Create Customer 
      </Typography>
      <form onSubmit={handleSubmit}>
      <div className="fieldRow">
          <TextField
           sx={{ mr: 2, mb: 2 }}
           shrink
            id="name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="fieldRow">
          <TextField
           sx={{ mr: 2, mb: 2 }}
           shrink
            id="phone"
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="fieldRow">
          <TextField
           sx={{ mr: 2, mb: 2 }}
           shrink
            id="mailAddressLine1"
            label="Mail Address Line 1"
            value={mailAddressLine1}
            onChange={(e) => setMailAddressLine1(e.target.value)}
            required
          />
        </div>
        <div className="fieldRow">
          <TextField
           sx={{ mr: 2, mb: 2 }}
           shrink
            id="mailAddressLine2"
            label="Mail Address Line 2"
            value={mailAddressLine2}
            onChange={(e) => setMailAddressLine2(e.target.value)}
          />
        </div>
        <div className="fieldRow">
          <TextField
           sx={{ mr: 2, mb: 2 }}
           shrink
            id="mailCity"
            label="Mail City"
            value={mailCity}
            onChange={(e) => setMailCity(e.target.value)}
          />
        </div>
        <div className="fieldRow">
          <TextField
           sx={{ mr: 2, mb: 2 }}
           shrink
            id="email"
            label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button variant="contained" color="success" type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
}

export default CreateCustomerPage;


