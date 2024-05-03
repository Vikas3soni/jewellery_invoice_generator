
// // App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react'; // Import the Auth0Provider
import LoginPage from './LoginPage';
import LandingPage from './LandingPage'; 
import ProductCreatePage from '../product/ProductCreatePage';
import CreateCustomerPage from '../customer/component/customerCreate';
import CustomerLedgerPage from '../customer/component/customerLedger';
import Invoice from '../Invoice'
import JewelerDetailsPage from '../profile/JewelerDetailsPage';
import CustomerList from '../customer/component/CustomerList';
import ProductSearchPage from '../product/ProductSearch';
import CssBaseline from '@mui/material/CssBaseline';
import Customers from '../customer';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const auth0Config = {
  domain:'dev-lotvu3kiqxm0vjkj.us.auth0.com',
  clientId:'JJbcfh5ArCcnE3bGlGWqJpXvw2g8HMmd',
  redirectUri: window.location.origin,
};

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#007bff', // Adjust primary color as desired
//     },
//   },
// });

function App() {
  return (
    //<ThemeProvider theme={theme}>
    //  <CssBaseline />
    <Router>
      <Auth0Provider {...auth0Config}>
        {/* <AuthProvider> */}
          <div>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/create-invoice" element={<Invoice />} />
              <Route path="/product" element={<ProductCreatePage />} /> 
              <Route path="/dashboard" element={<LandingPage />} /> 
              <Route path="/customer" element={<CreateCustomerPage />} />
              <Route path="/jeweller-profile" element={<JewelerDetailsPage />} /> 
              <Route path="/customer-search" element={<CustomerList />} />
              <Route path="/product-search" element={<ProductSearchPage />} />
              <Route path="/customers-page" element={<Customers />} />
              <Route path="/customers-ledger" element={<CustomerLedgerPage />} />
            </Routes>
          </div>
        {/* </AuthProvider> */}
      </Auth0Provider>
    </Router>
    //</ThemeProvider>
  );
}

export default App; // Export App as the default export






