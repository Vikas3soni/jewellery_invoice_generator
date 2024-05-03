import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './JewelerProfile.css';

function JewelerProfile() {
  const [jewelerData, setJewelerData] = useState({});
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate(); 
  const { user }= useAuth0();
  const ip = 'dev.sunarms.co.in'

  useEffect(() => {

    const fetchJewelerDetails = async () => {
      try {
	console.log('start')
        const response = await axios.get(`https://${ip}/get_profile_by_id?jeweller_id=${user.nickname}`);
	console.log('vikas')
	setJewelerData(response.data[0]);
        setFormData(response.data[0]);
        console.log(response.data[0])
      } catch (error) {
        console.error('Error fetching jeweler details:', error);
        navigate('/'); // Navigate to login page if error occurs
      }
    };

    fetchJewelerDetails();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const response = await axios.put(`https://${ip}/update_profile`, formData);
      console.log('Profile updated successfully:', response.data);
      setJewelerData(response.data);
      setEditMode(false);

      // Navigate to profiles page
      navigate('/dashboard');

      // Show success alert
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="jeweler-profile">
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <Typography variant="h4">Edit Profile</Typography>
          <TextField
            label="Firm Name"
            name="firm_name"
            value={formData.firm_name || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
          />
          <TextField
            label="GST"
            name="gst"
            value={formData.gst || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Mobile Number"
            name="mobile_number"
            value={formData.mobile_number || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="City"
            name="city"
            value={formData.city || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="GST Percentage"
            name="gst_percentage"
            value={formData.gst_percentage || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Owner"
            name="owner"
            value={formData.owner || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="PAN"
            name="pan"
            value={formData.pan || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Invoice Terms & Condition"
            name="invoice_tnc"
            value={formData.invoice_tnc || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button variant="contained" type="submit">Save</Button>
        </form>
      ) : (
        <>
          <Typography variant="h4">{jewelerData.firm_name}</Typography>
          <Typography variant="body1">{jewelerData.description}</Typography>
          <ul>
          <li><b>Firm Address:</b> {jewelerData.address}</li>
            <li><b>GST:</b> {jewelerData.gst}</li>
            <li>
              <b>Logo URL:</b>{' '}
              {jewelerData.logoUrl && (
                <a href={jewelerData.logoUrl} target="_blank" rel="noreferrer noopener">
                  View Logo
                </a>
              )}
            </li>
            <li><b>Mobile Number:</b> {jewelerData.mobile_number}</li>
            <li><b>Email:</b> {jewelerData.email}</li>
            <li><b>City:</b> {jewelerData.city}</li>
            <li><b>GST Percentage:</b> {jewelerData.gst_percentage}</li>
            <li><b>Owner:</b> {jewelerData.owner}</li>
            <li><b>PAN:</b> {jewelerData.pan}</li>
            <li><b>Invoice Terms & Condition:</b> {jewelerData.invoice_tnc}</li>
          </ul>
          <Button variant="contained" onClick={() => setEditMode(true)}>Update Profile</Button>
        </>
      )}
    </div>
  );
}

export default JewelerProfile;
