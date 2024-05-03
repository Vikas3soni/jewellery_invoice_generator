// import React, {useEffect, useState} from 'react';
// import { json } from 'react-router-dom';
// import CreateCustomerPage from './component/customerCreate';
// import CustomerList from './component/CustomerList';
// import { useAuth0 } from '@auth0/auth0-react';
// import './customers.css';

// const Customers = () => {
//   //const formData = watch();

// const { user }= useAuth0();

//   return (
//     <div className="root">
//       <CustomerList/>
//     </div>
//   );
// };

// export default Customers;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CreateCustomerPage from './component/customerCreate';
import CustomerList from './component/CustomerList';
import CustomerLedgerPage from './component/customerLedger';
import { useAuth0 } from '@auth0/auth0-react';
import './customers.css';

const Customers = () => {

  const { user } = useAuth0();

  const [showCreateCustomer, setShowCreateCustomer] = useState(false);

  return (
    <div className="landing-container ">
      <div className="sidebar">
        <div className="logo">
                <img src={require('../images/image_logo.jpeg')} alt="SunarMs Logo" />
        </div> 
        <ul className="nav-links">
          <li>
            <Link to="/customer">Create Customer</Link>
            
          </li>
          <li>
            <Link to="/customers-ledger">Customer Ledger</Link>
          </li>
        </ul>
      </div>
      <div className="content">
        {showCreateCustomer && <CreateCustomerPage onClose={() => setShowCreateCustomer(false)} />} {/* Conditionally render CreateCustomer */}
        <CustomerList />
      </div>
    </div>
  );
};

export default Customers;
