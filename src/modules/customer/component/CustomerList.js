import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ImDownload2 } from 'react-icons/im';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './CustomerList.css';
import {  Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function CustomerList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [customers, setCustomers] = useState([]);
  const { user }= useAuth0();
  const [pageSize, setPageSize] = useState(5);
  const ip='dev.sunarms.co.in'; 

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const ip='dev.sunarms.co.in';
      // Make sure to include the jeweller_id in the request
      const response = await axios.get(`https://dev.sunarms.co.in/list_customers?jeweller_id=${user.nickname}`);
      setCustomers(response.data);
      console.log(response.data)
    } catch (error) { 
      console.error('Error fetching customers:', error);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Mobile Number', width: 150 },
    { field: 'mail_address_line_1', headerName: 'Address Line 1', width: 200 },
    { field: 'mail_address_line_2', headerName: 'Address Line 2', width: 150 },
    { field: 'mail_city', headerName: 'City', width: 100 },
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.phone.includes(searchQuery)
  );

  const downloadCustomerData = () => {
    // Define headers based on customer object properties
    const headers = Object.keys(customers[0]);
    const csvContent = [
      headers.join(','),
      ...customers.map(customer => headers.map(header => customer[header]).join(',')),
    ].join('\n');
  
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "customer_data.csv");
    document.body.appendChild(link);
    link.click();
  };
  return (
    <div className="customer-list-container">
      <Typography variant="h6" className="page-title">
        Customer List
      </Typography>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Phone Number"
          value={searchQuery}
          onChange={handleSearch}
        />
        <button onClick={downloadCustomerData}>
          <ImDownload2 />
          Customer Data
        </button>
      </div>
      {/* <div className="add-customer-create-button-container">
        <Link to="/customer" className="add-customer-create-button">Create Customer</Link>
      </div> */}

      <div style={{ height: 500, width: '125%' }}>
        <DataGrid
          rows={filteredCustomers}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          pagination
        />
      </div>
    </div>
  );
}

export default CustomerList;


