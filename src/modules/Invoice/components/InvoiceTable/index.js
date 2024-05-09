import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react'; // Import useAuth0 hook (if needed)
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
} from '@mui/material';
//import './InvoiceTable.css';
function InvoiceTable() {
  const classes = useStyles();
  const { user, isAuthenticated, isLoading, error } = useAuth0(); // Destructure (if needed)
  const [invoices, setInvoices] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
	      //const ip='dev.sunarms.co.in';
	const response = await fetch(`https://dev.sunarms.co.in/list-invoices?jeweller_id=${user.nickname}`); 
        const data = await response.json();
        console.log(data,'invoice')
        setInvoices(data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      } finally {
        setIsLoadingData(false);
      }
    };

    if (isAuthenticated) {
      fetchInvoices();
    }
  }, [isAuthenticated]);

  return (
    <div className={classes.root}>
      {isLoadingData ? (
        <CircularProgress className={classes.progress} />
      ) : (
        <>
          <Typography variant="h6" align="center">
            Recent Invoices
          </Typography>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Invoice ID</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell align="right">Bill Amount</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">GST</TableCell>
                  <TableCell align="right">Discount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.bill_number}>
                    <TableCell component="th" scope="row">
                      {invoice.bill_number}
                    </TableCell>
                    <TableCell>{invoice.customer}</TableCell>
                    <TableCell align="right">{invoice.bill_amount}</TableCell>
                    <TableCell align="right">{invoice.bill_date}</TableCell>
                    <TableCell align="right">{invoice.gst}</TableCell>
                    <TableCell align="right">{invoice.discount}</TableCell>
		
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column', // Adjust layout as needed
    alignItems: 'center',
    padding: theme.spacing(1),
  },
  progress: {
    margin: theme.spacing(1),
  },
  table: {
    minWidth: 400,
  },
}));

export default InvoiceTable;
