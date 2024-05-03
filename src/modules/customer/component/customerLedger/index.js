import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './customerLedger.css';
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Collapse,
  CircularProgress,
  Typography as MuiTypography,
  TextField,
  Pagination,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

function CustomerLedgerPage() {
  const [customers, setCustomers] = useState([]);
  const { user } = useAuth0();
  const [expandedCustomer, setExpandedCustomer] = useState(null);
  const [invoiceLoading, setInvoiceLoading] = useState(false); 
  const [invoiceHistory, setInvoiceHistory] = useState({});
  const [currentPage, setCurrentPage] = useState(1); 
  const [customersPerPage, setCustomersPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState('');
  const ip='dev.sunarms.co.in';
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`https://dev.sunarms.co.in/list_customers?jeweller_id=${user.nickname}`);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleExpandClick = (customerId) => {
    setExpandedCustomer(expandedCustomer === customerId ? null : customerId);
  
    // Call fetchInvoiceHistory only if the customer row is being expanded (i.e., expandedCustomer is not null)
    if (expandedCustomer) {
      fetchInvoiceHistory(customerId);
    }
  };
  

  const fetchInvoiceHistory = async (customerId) => {
    try {
      setInvoiceLoading(true); // Set loading state

      const response = await axios.get(`https://dev.sunarms.co.in/list-invoice-by-customer?jeweller_id=${user.nickname}&customer_id=${customerId}`);
      setInvoiceHistory({ ...invoiceHistory, [customerId]: response.data }); // Update invoice data for the customer
    } catch (error) {
      console.error('Error fetching invoice history:', error);
      // Handle error gracefully, e.g., display an error message to the user
    } finally {
      setInvoiceLoading(false); // Clear loading state
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase()); // Normalize search query
  };

  const [filteredCustomers, setFilteredCustomers] = useState([]);

  useEffect(() => {
    const filteredData = customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchQuery) ||
      customer.phone.includes(searchQuery)
    );
    setFilteredCustomers(filteredData);
  }, [customers, searchQuery]); // Dependencies: customers and searchQuery

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  
  useEffect(() => {
    const startIndex = (currentPage - 1) * customersPerPage;
    const endIndex = startIndex + customersPerPage;
    setFilteredCustomers(customers.slice(startIndex, endIndex).filter((customer) =>
      customer.name.toLowerCase().includes(searchQuery) ||
      customer.phone.includes(searchQuery)
    ));
  }, [customersPerPage, currentPage, customers, searchQuery]);


  return (
    <div className="customer-ledger-container">
      <Typography variant="h6" className="page-title">
        Customer Ledger
      </Typography>
      <TextField
        label="Search by Name or Mobile Number"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        style={{ marginBottom: '1rem' }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Address Line 1</TableCell>
              <TableCell>Address Line 2</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="right">More Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <React.Fragment key={customer.id}>
                <TableRow>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.mail_address_line_1}</TableCell>
                  <TableCell>{customer.mail_address_line_2}</TableCell>
                  <TableCell>{customer.mail_city}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => handleExpandClick(customer.id)}
                      aria-expanded={expandedCustomer === customer.id}
                      aria-label="show more"
                    >
                      {expandedCustomer === customer.id ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={expandedCustomer === customer.id} timeout="auto" unmountOnExit>
                      <div className="invoice-history-container">
                        <Typography variant="subtitle2">Invoice History</Typography>
                        {invoiceLoading ? (
                          <CircularProgress color="primary" />
                        ) : invoiceHistory[customer.id]?.length > 0 ? (
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Bill ID</TableCell>
                                <TableCell>Bill Date</TableCell>
                                <TableCell>Bill Amount</TableCell>
                                <TableCell>Discount</TableCell>
                                <TableCell>Payment Mode</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {invoiceHistory[customer.id].map((invoice) => (
                                <TableRow key={invoice.id}>
                                  <TableCell>{invoice.bill_number}</TableCell>
                                  <TableCell>{invoice.bill_date}</TableCell>
                                  <TableCell>{invoice.bill_amount}</TableCell>
                                  <TableCell>{invoice.discount}</TableCell>
                                  <TableCell>{invoice.payment_mode}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        ) : (
                          <MuiTypography variant="body2">No invoices found for this customer.</MuiTypography>
                        )}
                      </div>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(customers.length / customersPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </div>
  );
};
    
export default CustomerLedgerPage;
